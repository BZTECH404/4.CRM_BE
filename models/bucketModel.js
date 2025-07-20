const mongoose = require('mongoose');
const { Schema } = mongoose;
const tasksmodel = require('./tasksmodel');
const usermodel = require('./userModel');

// Define the Bucket Schema

const BucketSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId, // Reference to Task model
      ref: 'Task', // The name of the Task model
      // required: true,
    }
  ],
  taskrecording: [
    {
      key: {
        type: Schema.Types.ObjectId, // Reference to Task model
        ref: 'Task', 
      },
      value: {
        type: String,
        required: true,
      },
    }
  ],
  user:
  {
    type: Schema.Types.ObjectId, // Reference to User model
    ref: 'User', // The name of the User model
    required: true,
  }
});

// Create the Bucket model
const Bucket = mongoose.model('Bucket', BucketSchema);

module.exports = Bucket;
