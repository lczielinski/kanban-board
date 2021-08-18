const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { taskSchema } = require('./Task');

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  toDoTasks: [taskSchema],
  inProgressTasks: [taskSchema],
  completedTasks: [taskSchema],
});

module.exports = mongoose.model('User', userSchema);
