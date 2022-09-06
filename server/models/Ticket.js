const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ticketSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high", "urgent"],
      default: "low",
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

module.exports = mongoose.model("User", ticketSchema);
