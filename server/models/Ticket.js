const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ticketSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
      ref: "Project"
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team"
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["Bug", "Feature"],
      default: "Bug"
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
  },
  {
    timeStamps: true,
  }
);

ticketSchema.plugin(AutoIncrement, {
    inc_field: 'number',
    id: 'ticketNums',
    start_seq: 0
})

module.exports = mongoose.model("Ticket", ticketSchema);
