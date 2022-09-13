const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
