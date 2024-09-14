const { validationResult } = require('express-validator');
const cloudinary = require('../../utils/cloudinary.js');
const Turf = require('../../models/turf.model.js');
const Review = require('../../models/review.model.js');

// Register a new turf
const turfRegister = async (req, res) => {
  const image = req.file.path;
  const manager = req.manager.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    // Upload the turf image to Cloudinary
    const turfImage = await cloudinary.uploader.upload(image, {
      folder: 'TurfSpot/turfs',
    });
    const turf = new Turf({
      image: turfImage.secure_url,
      manager,
      ...req.body,
    });
    await turf.save();
    return res
      .status(201)
      .json({ success: true, message: 'Turf created successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all turfs by Manager ID
const getTurfByManager = async (req, res) => {
  const managerId = req.manager.id;

  try {
    const turfs = await Turf.find({ manager: managerId });

    // Get all reviews by turf ID of Manager
    const turfsWithAvgRating = await Promise.all(
      turfs.map(async (turf) => {
        const reviewCount = turf.reviews.length;
        const avgRating =
          reviewCount > 0
            ? await Review.aggregate([
                { $match: { turf: turf._id } },
                { $group: { _id: null, avgRating: { $avg: '$rating' } } },
              ])
            : 0;
        return {
          ...turf.toObject(),
          avgRating: avgRating[0] ? avgRating[0].avgRating : 0,
        };
      })
    );

    return res.status(200).json(turfsWithAvgRating);
  } catch (err) {
    console.error('Error getting turfs by ManagerId', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Edit turf by ID
const editTurfById = async (req, res) => {
  const manager = req.manager.id;
  const { id } = req.params;
  const { sportTypes, sportsType, ...otherDetails } = req.body;
  if (req.body.sportsType) {
    sportTypes.push(sportsType);
  }

  const updatedTurfData = {
    ...otherDetails,
    sportTypes,
  };

  try {
    const updatedTurf = await Turf.findOne({ manager: manager, _id: id });
    if (!updatedTurf) {
      return res
        .status(404)
        .json({ success: false, message: 'Turf not found' });
    }

    await Turf.findOneAndUpdate({ manager: manager, _id: id }, updatedTurfData, {
      new: true,
    });
    const allTurfs = await Turf.find({ manager: manager });
    return res
      .status(200)
      .json({ success: true, message: 'Turf updated successfully', allTurfs });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  turfRegister,
  getTurfByManager,
  editTurfById,
};
