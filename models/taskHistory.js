const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the task model
const taskHistorySchema = new mongoose.Schema({
  ActualCreatedAt:{
    type:Date,
    default:Date.now()
  },
  CreatedAt:{
    type:Date,
    default:Date.now()
  },
  taskDescription: {
    type: String,
  },
  taskId:{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
  taskfileURL: {
    type: String,
    
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  files: [{
    type: String,
  }],
});

// // Create the Task model using the task schema
const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);

module.exports = TaskHistory;

// const taskHistorySchema = new mongoose.Schema({
//   taskDescription: {
//     type: String,
//   },
//   taskfileURL: {
//     type: String,
//     default:null
//   },
//   CreatedAt:{
//     type:Date,
//     default:Date.now()
//   },
//   CompletedAt:{
//     type:Boolean,
//     default:false
//   },
//   CompletedAt:{
//     type:Date,
//     default:null
//   }
// });