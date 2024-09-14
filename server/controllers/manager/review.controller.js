const Turf = require("../../models/turf.model.js");
const Review = require("../../models/review.model.js");

const getTurfsWithReviews = async (req, res) => {
  const managerId = req.manager.id;

  try {
    const turfs = await Turf.find({ manager: managerId })
      .select("name reviews")
      .lean();

    // Fetch reviews for all turfs
    const turfIds = turfs.map((turf) => turf._id);
    const reviews = await Review.find({ turf: { $in: turfIds } })
      .populate("user", "name")
      .lean();

    // Calculate average rating and add reviews to each turf
    const turfsWithReviews = turfs.map((turf) => {
      const turfReviews = reviews.filter((review) =>
        review.turf.equals(turf._id)
      );
      const avgRating =
        turfReviews.reduce((sum, review) => sum + review.rating, 0) /
        (turfReviews.length || 1);
      return {
        id: turf._id,
        name: turf.name,
        avgRating: parseFloat(avgRating.toFixed(1)),
        reviews: turfReviews.map((review) => ({
          id: review._id,
          userName: review.user.name,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
        })),
      };
    });

    return res.status(200).json(turfsWithReviews);
  } catch (error) {
    console.error("Error in getTurfsWithReviews", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports =  getTurfsWithReviews ;
