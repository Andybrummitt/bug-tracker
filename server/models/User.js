const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
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
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
