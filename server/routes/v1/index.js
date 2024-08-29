const express = require('express');
const v1Router = express.Router();


const userRouter=require("./user/userroutes.js");
const managerRouter = require( "./manager/manager.routes.js");
//import adminRouter from "./admin/admin.routes.js";
v1Router.use("/user", userRouter);
v1Router.use("/manager", managerRouter)
//v1Router.use("/admin", adminRouter)

module.exports= v1Router;