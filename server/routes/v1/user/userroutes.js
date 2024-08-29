const express = require('express');
const {turfRouter}=require('./turf.routes.js')
const userRouter = express.Router();

userRouter.use("/turf", turfRouter);

module.exports= userRouter;