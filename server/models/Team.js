const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', unique: true }],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
