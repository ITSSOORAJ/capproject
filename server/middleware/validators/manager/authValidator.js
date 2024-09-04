const { body } = require("express-validator");

const validateRegisterInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("phone").isMobilePhone("en-IN").withMessage("Phone number is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const validateLoginInput = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validatemanagerRequestInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("phone").isMobilePhone("en-IN").withMessage("Phone number is invalid"),
];

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validatemanagerRequestInput,
};
