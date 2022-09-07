const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
