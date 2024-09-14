const express = require('express');
const {
  getAllTurfs,
  getTurfById,
  getTimeSlotByTurfId
} = require('../../../controllers/user/turf.controller');

const turfRouter = express.Router();

// Get all turfs
turfRouter.get('/all', getAllTurfs);

// Get single turf by id
turfRouter.get('/details/:id', getTurfById);

// Get time slots by turf id (pass with query)
turfRouter.get('/timeSlot', getTimeSlotByTurfId);

module.exports = turfRouter; // Ensure you are exporting the router correctly
