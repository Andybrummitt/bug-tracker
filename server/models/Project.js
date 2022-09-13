const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, 
    team: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Team",
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
