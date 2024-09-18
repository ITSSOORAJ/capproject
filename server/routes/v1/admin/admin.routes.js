const express = require('express');
const verifyAdminToken = require('../../../middleware/jwt/admin.middleware')
const managerManagementRouter = require('./managerManagement.routes')
const managerRequestRouter = require("./requestManagement.routes.js");
const userManagementRouter = require("./userManagement.routes.js")
const transactionRouter = require("./transaction.routes.js")
const dashboardRouter =require("./dashboard.routes.js")
const turfRouter = require("./turf.routes.js")
const adminRouter = express.Router();
adminRouter.use("/managers",verifyAdminToken,managerManagementRouter)
adminRouter.use("/manager-requests", verifyAdminToken, managerRequestRouter);
adminRouter.use("/users", verifyAdminToken, userManagementRouter);
adminRouter.use("/transactions", verifyAdminToken, transactionRouter);
adminRouter.use("/dashboard", verifyAdminToken, dashboardRouter);
adminRouter.use("/turfs", verifyAdminToken, turfRouter);
module.exports = adminRouter;