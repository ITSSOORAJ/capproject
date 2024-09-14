const express = require('express');
const {
  turfRegister,
  getTurfByManager,
  editTurfById
} = require('../../../controllers/manager/turf.controller.js');
const upload = require('../../../middleware/uploads/upload.middleware.js');
const verifyManagerToken = require('../../../middleware/jwt/manager.middleware.js');

const turfRouter = express.Router();

turfRouter.post( '/register',verifyManagerToken,upload.single('image'),turfRegister);

turfRouter.get('/all', verifyManagerToken, getTurfByManager);
turfRouter.put('/:id', verifyManagerToken, editTurfById);

module.exports = turfRouter;
