const Turf = require("../../models/turf.model.js");
const TimeSlot = require("../../models/timeSlot.model.js");
const { format, parseISO, startOfDay } = require("date-fns");

// get all turfs
const getAllTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({});
    return res.status(200).json({ turfs });
  } catch (err) {
    console.log("Error in getAllTurfs",err);
    return res.status(500).json({ message: err.message });
  }
};

// get single turf by id
const getTurfById = async (req, res) => {
  const { id } = req.params;
  try {
    const turf = await Turf.findById(id);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }
    return res.status(200).json({ turf });
  } catch (error) {
    console.log("Error in getTurfById",error);
    return res.status(500).json({ message: error.message });
  }
};

// get time slots by turf id
const getTimeSlotByTurfId = async (req, res) => {
  const { date, turfId } = req.query;

  const selectedDate = new Date(date);
  const startOfSelectedDate = startOfDay(selectedDate);
  const endOfSelectedDate = new Date(startOfSelectedDate);
  endOfSelectedDate.setDate(endOfSelectedDate.getDate() + 1);

  const query = {
    turf: turfId,
    startTime: { $gte: startOfSelectedDate },
    endTime: { $lt: endOfSelectedDate },
  };

  try {
    // get all time slot when there is no turfId in TimeSlot db
    const bookedTime = await TimeSlot.find(query);
    const timeSlots = await Turf.findById(turfId).select([
      "openTime",
      "closeTime",
      "pricePerHour",
    ]);
    return res.status(200).json({ timeSlots, bookedTime });
  } catch (error) {
    console.log("Error in getTimeSlotByTurfId", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports ={getAllTurfs,getTimeSlotByTurfId,getTurfById}