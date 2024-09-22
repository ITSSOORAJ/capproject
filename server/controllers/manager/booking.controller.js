const Booking = require("../../models/booking.model.js");
const Turf = require("../../models/turf.model.js");

const getManagerBookings = async (req, res) => {
  try {
    const managerId = req.manager.id;

    // Find turfs  by this manager
    const manTurfs = await Turf.find({ manager: managerId }).select("_id");
    console.log(manTurfs.length, "ManagedTurfs");

    if (manTurfs.length === 0) {
      console.log("No bookings found for this manager's turfs");
      return res.status(404).json({ message: "No turfs found for this manager" });
    }

    const turfIds = manTurfs.map((turf) => turf._id);

    const bookings = await Booking.aggregate([
      {
        $match: {
          turf: { $in: turfIds },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "turves",  // Ensure this matches the actual collection name
          localField: "turf",
          foreignField: "_id",
          as: "turf",
        },
      },
      {
        $lookup: {
          from: "timeslots",
          localField: "timeSlot",
          foreignField: "_id",
          as: "timeSlot",
        },
      },
      { $unwind: "$user" },
      { $unwind: "$turf" },
      { $unwind: "$timeSlot" },
      {
        $project: {
          id: "$_id",
          turfName: "$turf.name",
          userName: "$user.name",
          totalPrice: 1,
          bookingDate: "$createdAt",
          duration: {
            $divide: [
              { $subtract: ["$timeSlot.endTime", "$timeSlot.startTime"] },
              1000 * 60 * 60, // Convert milliseconds to hours
            ],
          },
          startTime: "$timeSlot.startTime",
          endTime: "$timeSlot.endTime",
        },
      },
      { $sort: { bookingDate: -1 } },
    ]);

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this manager's turfs" });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in getManagerBookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

module.exports = getManagerBookings;
