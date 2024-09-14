const User = require("../../models/user.model.js");
const Turf = require("../../models/turf.model.js");
const Booking = require("../../models/booking.model.js");
const ManagerRequest = require("../../models/managerRequest.model.js");
const Manager = require("../../models/manager.model.js");

const getDashboard = async (req, res) => {
  try {
    // Get only the count
    const totalUsers = await User.countDocuments();
    const totalManagers = await Manager.countDocuments({ role: "manager" });
    const totalTurfs = await Turf.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingRequests = await ManagerRequest.countDocuments({
      status: "pending",
    });
    const rejectedRequests = await ManagerRequest.countDocuments({
      status: "rejected",
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const bookingHistory = await Booking.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: "$_id",
          amount: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      totalUsers,
      totalManagers,
      totalTurfs,
      totalBookings,
      pendingRequests,
      rejectedRequests,
      bookingHistory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error getting dashboard" });
  }
};

module.exports = getDashboard;
