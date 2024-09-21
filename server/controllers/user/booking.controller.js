const adjustTime = require('../../utils/adjustTime');
const razorpay = require('../../config/razorpay');
const crypto = require('crypto');
const Booking = require('../../models/booking.model');
const TimeSlot = require('../../models/timeSlot.model');
const generateQRCode = require('../../utils/generateQRCode');
const Turf = require('../../models/turf.model');
//const generateEmail = require('../../utils/generateEmail');
const { generateHTMLContent,generateEmail } = require('../../utils/generateEmail');
const User = require('../../models/user.model');
const { format, parseISO } = require('date-fns');

exports.createOrder = async (req, res) => {
  const userId = req.user.user;
  try {
    const { totalPrice } = req.body;

    // Find the user and select only necessary fields
    const user = await User.findById(userId).select('name email');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create the Razorpay order
    const options = {
      amount: totalPrice * 100,
      currency: 'INR',
      receipt: `receipt${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    return res.status(200).json({ order, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const userId = req.user.user;

  const {
    id: turfId,
    duration,
    startTime,
    endTime,
    selectedTurfDate,
    totalPrice,
    paymentId,
    orderId,
    razorpay_signature,
  } = req.body;

  try {
    // Format the start, end times, and date
    const formattedStartTime = format(parseISO(startTime), 'hh:mm a');
    const formattedEndTime = format(parseISO(endTime), 'hh:mm a');
    const formattedDate = format(parseISO(selectedTurfDate), 'd MMM yyyy');

    // Verify the Razorpay signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest('hex');
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment Verification Failed' });
    }

    // Adjust time
    const adjustedStartTime = adjustTime(startTime, selectedTurfDate);
    const adjustedEndTime = adjustTime(endTime, selectedTurfDate);

    // Find the user and turf
    const [user, turf] = await Promise.all([
      User.findById(userId),
      Turf.findById(turfId),
    ]);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!turf) {
      return res.status(404).json({ success: false, message: 'Turf not found' });
    }

    // Generate QR code
    const QRcode = await generateQRCode(
      totalPrice,
      formattedStartTime,
      formattedEndTime,
      formattedDate,
      turf.name,
      turf.location
    );

    // Create time slot and booking
    const [timeSlot, booking] = await Promise.all([
      TimeSlot.create({
        turf: turfId,
        startTime: adjustedStartTime,
        endTime: adjustedEndTime,
      }),
      Booking.create({
        user: userId,
        turf: turfId,
        timeSlot: null, // Will be updated after TimeSlot is created
        totalPrice,
        qrCode: QRcode,
        payment: { orderId, paymentId },
      }),
    ]);

    // Update the booking with time slot
    booking.timeSlot = timeSlot._id;

    await Promise.all([
      booking.save(),
      User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } }),
    ]);

    // Generate and send email
    const htmlContent = generateHTMLContent(
      turf.name,
      turf.location,
      formattedDate,
      formattedStartTime,
      formattedEndTime,
      totalPrice,
      QRcode
    );

    // Ensure generateEmail is imported correctly
    generateEmail(user.email, 'Booking Confirmation', htmlContent);

    return res.status(200).json({
      success: true,
      message: 'Booking successful, Check your email for the receipt',
    });
  } catch (error) {
    console.error('Error in verifyPayment', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your booking',
    });
  }
};

// Get bookings for a user
exports.getBookings = async (req, res) => {
  const userId = req.user.user;
  try {
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .select('qrCode totalPrice')
      .populate('timeSlot', 'startTime endTime')
      .populate('turf', 'name location');

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};