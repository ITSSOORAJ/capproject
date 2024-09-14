const express = require('express');
//const {turfRouter}=require('./turf.routes.js')

const authRouter=require('./auth.routes.js')
const turfRouter = require('./turf.routes.js')
const reviewsRouter = require('./reviews.routes.js')
const bookingsRouter = require('./bookings.routes.js')
const dashboardRouter = require('./dashboard.routes.js')
const managerRouter = express.Router();

//managerRouter.use("/turf", turfRouter);
managerRouter.use("/auth",authRouter);
managerRouter.use("/turf",turfRouter);
managerRouter.use("/reviews",reviewsRouter);
managerRouter.use("/bookings",bookingsRouter);
managerRouter.use("/dashboard",dashboardRouter);

module.exports= managerRouter;