const Turf = require("../../models/turf.model.js");
const Manager = require("../../models/manager.model.js");
const Review = require("../../models/review.model.js");

//  get all MAnagers

const getAllManagers = async (req, res) => {
  const admin = req.admin.role;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const managers = await Manager.find({ role: "manager" }, { password: 0 });
    res.status(200).json({
      message: "Fetched all managers",
      managers,
    });
  } catch (error) {
    console.error("Error in getAllManagers: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get turf by manager id

const getTurfByManagerId = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const turfs = await Turf.find({ manager: id }).lean();
    const turfsWithAvgRating = await Promise.all(
      turfs.map(async (turf) => {
        const reviews = await Review.find({ turf: turf._id });
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        return {
          ...turf,
          avgRating: Number(avgRating.toFixed(1)),
        };
      })
    );

    console.log(turfsWithAvgRating, "turfsWithAvgRating");

    return res.status(200).json({
      message: "Fetched turf",
      turfs: turfsWithAvgRating,
    });
  } catch (error) {
    console.error("Error in getTurfByManagerId: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllManagers, getTurfByManagerId };
