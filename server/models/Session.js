const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    skillOffered: {
      type: String,
      required: true
    },
    skillRequested: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
