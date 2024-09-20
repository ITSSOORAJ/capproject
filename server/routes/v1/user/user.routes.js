const express = require('express');
const turfRouter=require('./turf.routes.js')
const authRouter=require('./auth.routes.js')
const bookingRouter=require('./booking.routes.js') // boking and payment not setted up due to payment  related issue
const reviewRouter = require('./review.routes.js')
const userRouter = express.Router();

userRouter.use("/turf", turfRouter);
userRouter.use("/auth",authRouter);
userRouter.use("/bookings",bookingRouter);
userRouter.use("/review",reviewRouter);
module.exports= userRouter;