const argon2 = require("argon2");
const User = require("../../models/user.model.js");
const { generateUserToken } = require("../../utils/generateJwtToken.js");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const data = req.body;
  console.log(data)
  const { name, email, password } = data;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({ ...data, password: hashedPassword });
    await newUser.save();
    const token = generateUserToken(newUser._id);
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email" });
    }
    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = generateUserToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
