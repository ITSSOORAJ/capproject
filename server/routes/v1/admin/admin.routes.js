const express = require('express');
const verifyAdminToken = require('../../../middleware/jwt/admin.middleware')
const managerManagementRouter = require('./managerManagement.routes')
const managerRequestRouter = require("./requestManagement.routes.js");
const adminRouter = express.Router();
adminRouter.use("/managers",verifyAdminToken,managerManagementRouter)
adminRouter.use("/owner-requests", verifyAdminToken, managerRequestRouter);
module.exports = adminRouter;