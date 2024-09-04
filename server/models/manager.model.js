const mongoose = require( "mongoose");

const managerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager"], default: "manager" },
  },
  { timestamps: true }
);

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;