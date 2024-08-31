const express = require("express")
const Router = require("express");

const{
  registerUser,
  loginUser,
} = require( "../../../controllers/user/auth.controller.js");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../../middleware/validators/user/authValidator.js");

const authRouter = Router();
authRouter.post("/register", validateRegisterInput, registerUser);
authRouter.post("/login", validateLoginInput, loginUser);

module.exports = authRouter;