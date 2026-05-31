const mongoose = require("mongoose");

const recallSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recall = mongoose.model("Recall", recallSchema);

module.exports = Recall;