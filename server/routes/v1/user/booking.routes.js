const express = require('express');
const {
  verifyPayment,
  createOrder,
  getBookings
} = require('../../../controllers/user/booking.controller');
const verifyUserToken = require('../../../middleware/jwt/user.middleware');

const bookingRouter = express.Router();

bookingRouter.post('/create-order', verifyUserToken, createOrder);
bookingRouter.post('/verify-payment', verifyUserToken, verifyPayment);
bookingRouter.get('/get-bookings', verifyUserToken, getBookings);

module.exports = bookingRouter;
