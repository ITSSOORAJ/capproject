const Turf = require("../../models/turf.model.js");
const Review = require("../../models/review.model.js");

// Get all turfs
const getAllTurfs = async (req, res) => {
  const admin = req.admin.role;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const turfs = await Turf.find().lean();

    // Calculate average rating for each turf
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
    console.log(turfsWithAvgRating);
    return res.status(200).json({
      turfs: turfsWithAvgRating,
    });
  } catch (error) {
    console.error("Error in getAllTurfs: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports =  getAllTurfs ;
