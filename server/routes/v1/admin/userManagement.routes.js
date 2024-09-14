const express = require("express");
const { getAllUsers } = require("../../../controllers/admin/userManagement.controller.js");
const verifyAdminToken = require("../../../middleware/jwt/admin.middleware.js");

const userManagementRouter = express.Router();

userManagementRouter.get("/all", getAllUsers);

module.exports = userManagementRouter;
