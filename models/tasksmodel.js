const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the task model
const taskSchema = new mongoose.Schema({
  projectName: {
    type: String,
    
  },
  projectid:{
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required:true,
  },
  assignTaskTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  assignedby: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  taskSubject: {
    type: String,
    // required:true,
    default:"No Subject"
  },
  taskDescription: {
    type: String,
    
  },
  taskUrl: {
    type: String
    // No "required" property here
  },
  taskCompleted:{
    type:Boolean,
    default:false
  },
  taskHistory:[{
    type: Schema.Types.ObjectId,
    ref: '',
  }],
  CreatedAt:{
    type:Date,
    default:Date.now()
  },
  ActualCreatedAt:{
    type:Date,
    default:Date.now()
  },
  CompletedAt:{
    type:Date,
    default:null
  },
  nooftask:{
    type:Number,
    default:0
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  deadline:{
    type:Date,
    default:Date.now()
  }

});

// Create the Task model using the task schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
