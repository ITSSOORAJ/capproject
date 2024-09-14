const express = require("express");
const  getDashboard  = require("../../../controllers/admin/dashboard.controller");

const dashboardRouter = express.Router();

dashboardRouter.get("/", getDashboard);

module.exports = dashboardRouter;
