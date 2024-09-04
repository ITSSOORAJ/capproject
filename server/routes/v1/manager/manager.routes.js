const express = require('express');
//const {turfRouter}=require('./turf.routes.js')
const authRouter=require('./auth.routes.js')
const managerRouter = express.Router();

//managerRouter.use("/turf", turfRouter);
managerRouter.use("/auth",authRouter);

module.exports= managerRouter;