const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItem = new Schema({
  status: {
    type: String,
    enum: ["incomplete", "completed"],
    default: "incomplete"
  },
  deadline: {
    type: Date
  },
  content: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("todoitem", TodoItem);
