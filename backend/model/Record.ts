const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Room must have a title"] },
  description: {
    type: String,
    required: [true, "Room must have a description"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  attendantTime: {
    type: Date,
    default: Date.now,
  },
  startedAt: Date,
  endedAt: Date,
  status: {
    type: String,
    enum: {
      values: ["pending", "active", "over"],
      message: "Status must be pending, active, or over",
    },
    default: "pending",
  },
  thumbnail: {
    type: String,
    default: "room.png",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Room must be created by an expert"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: [true, "Room must have a category"],
  },
  evidence: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
  },
  videoUrl: String,
  uuid: String,
});

module.exports = mongoose.model("Room", roomSchema);