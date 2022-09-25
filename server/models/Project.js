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
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
