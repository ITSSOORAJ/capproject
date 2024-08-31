const express = require('express');
const {turfRouter}=require('./turf.routes.js')
const authRouter=require('./auth.routes.js')
const userRouter = express.Router();

userRouter.use("/turf", turfRouter);
userRouter.use("/auth",authRouter);

module.exports= userRouter;