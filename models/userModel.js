// models/UserModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const validRoles = ['user', 'admin' , 'client'];

const userSchema = new Schema({
  actualCreatedAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Basic email validation
        return /\S+@\S+\.\S+/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: validRoles,
    // default: 'user',
    required: true,
  },
  paths: {
    type: Object,
    default:""
  },
  status:{
    type: String,
    default: "active"
  },
  // bucket: [
  //   {
  //     date: {
  //       type: Date,
  //       required: true,
  //       default: Date.now,
  //     },
  //     tasks: [
  //       {
  //         type: Schema.Types.ObjectId, // Reference to Task model
  //         ref: 'Task', // The name of the Task model
  //         required: true,
  //       }
  //     ],

  //   }
  // ]
  isDisabled: {
    type: Boolean,
    default: false
  }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
