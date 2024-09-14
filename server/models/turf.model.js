const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    sportTypes: [{ type: String, required: true }],
    pricePerHour: { type: Number, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      required: true,
    },
  },
  { timestamps: true }
);

const Turf = mongoose.model("Turf", turfSchema);

module.exports = Turf;
