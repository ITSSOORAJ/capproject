const express = require("express");
const { getDashboardData } = require("../../../controllers/manager/dashboard.controller.js");
const verifyManagerToken = require("../../../middleware/jwt/manager.middleware.js");

const dashboardRouter = express.Router();

dashboardRouter.get("/", verifyManagerToken, getDashboardData);

module.exports = dashboardRouter;
