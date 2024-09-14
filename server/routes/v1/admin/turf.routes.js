const express = require("express");
const  getAllTurfs  = require("../../../controllers/admin/turf.controller.js");
const verifyAdminToken = require("../../../middleware/jwt/admin.middleware.js");

const turfRouter = express.Router();

turfRouter.get("/all", verifyAdminToken, getAllTurfs);

module.exports = turfRouter;
