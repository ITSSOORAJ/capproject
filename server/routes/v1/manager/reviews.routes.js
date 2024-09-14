const express = require("express");
const verifyManagerToken = require("../../../middleware/jwt/manager.middleware.js");
const  getTurfsWithReviews  = require("../../../controllers/manager/review.controller.js");

const reviewsRouter = express.Router();

reviewsRouter.get("/turfs-with-reviews", verifyManagerToken, getTurfsWithReviews);

module.exports = reviewsRouter;
