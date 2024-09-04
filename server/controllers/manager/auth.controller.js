const argon2 = require("argon2");
const { generateManagerToken } = require("../../utils/generateJwtToken.js");
const Manager = require("../../models/manager.model.js");
const { validationResult } = require("express-validator");
const ManagerRequest = require("../../models/managerRequest.model.js");

//  manager request controller when admin approves the manager, the manager can register and login

const managerRequest = async (req, res) => {
  const { name, email, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const managerRequest = await ManagerRequest.findOne({ email });
    if (managerRequest) {
      return res
        .status(400)
        .json({ success: false, message: "manager request already exists" });
    }
    const newManagerRequest = new ManagerRequest({
      name,
      email,
      phone,
    });
    await newManagerRequest.save();
    return res
      .status(201)
      .json({ success: true, message: "manager request created successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

const registermanager = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const managerRequest = await ManagerRequest.findOne({ email });

    if (!managerRequest) {
      return res
        .status(400)
        .json({ success: false, message: "manager request does not exist" });
    }

    if (managerRequest.status === "pending") {
      return res
        .status(400)
        .json({ success: false, message: "manager request is not approved" });
    }

    if (managerRequest.status === "rejected") {
      return res
        .status(400)
        .json({ success: false, message: "manager request is rejected" });
    }

    const manager = await Manager.findOne({ email });
    if (manager) {
      return res
        .status(400)
        .json({ success: false, message: "manager already exists" });
    }
    const hashedPassword = await argon2.hash(password);

    const newManager = new Manager({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newManager.save();
    const token = generateManagerToken(newManager);
    return res.status(201).json({
      success: true,
      message: "manager created successfully",
      token,
      role: newManager.role,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const loginmanager = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res
        .status(400)
        .json({ success: false, message: "manager does not exist" });
    }
    const isPasswordCorrect = await argon2.verify(manager.password, password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = generateManagerToken(manager);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: Manager.role,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  managerRequest,
  registermanager,
  loginmanager,
};
