const { Router } = require("express");
const {
  registermanager,
  loginmanager,
  managerRequest,
} = require("../../../controllers/manager/auth.controller.js");
const {
  validateRegisterInput,
  validateLoginInput,
  validatemanagerRequestInput,
} = require("../../../middleware/validators/manager/authValidator.js");

const authRouter = Router();
authRouter.post("/register", validateRegisterInput, registermanager);
authRouter.post("/login", validateLoginInput, loginmanager);
authRouter.post("/managerRequest", validatemanagerRequestInput, managerRequest);

module.exports = authRouter;
