const express = require("express");
const getManagerBookings  = require("../../../controllers/manager/booking.controller.js");
const verifyManagerToken = require("../../../middleware/jwt/manager.middleware.js");

const bookingsRouter = express.Router();
bookingsRouter.get("/", verifyManagerToken, getManagerBookings);

module.exports = bookingsRouter;
