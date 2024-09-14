const express = require("express");
const {
  addReview,
  viewReviewsByTurf,
} = require("../../../controllers/user/review.controller.js");
const verifyUserToken = require("../../../middleware/jwt/user.middleware.js");

const reviewRouter = express.Router();

reviewRouter.post("/:id", verifyUserToken, addReview);
reviewRouter.get("/:id", viewReviewsByTurf);

module.exports = reviewRouter;
