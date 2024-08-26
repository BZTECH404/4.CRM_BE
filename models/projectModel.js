// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  status:{
    type: String,
  },
  stage:{
    type:String,
    default:""
  },
  type: {
    type: String,
    default: null,
    required: true,
  },
  developer: {
    type: String,
    default: null,
  },
  company:{
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  area: {
    type: Number,
    default: null,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  questions: [{
    question: {
        type: Schema.Types.ObjectId,
        ref:'question'
    },
    answer: {
        type: String
    },
    prevanswer: [{
      type: String
  }],
}],
  // New field to reference an array of user IDs
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  isDisabled:{
    type:Boolean,
    default:false
},
ward:{
  type:String,
  default:""
},
cts:{
  type:String,
  default:""
},
files: [{
  order:{
    type:Number,
    default:0
  },
  date:{
    type:Date,
    default:Date.now()
  },
  filename:{
    type:String
  },
  current: {
    type: String
  },
  prevlinks: [{
    type: String
}],
  isDisabled:{
    type:Boolean,
    default:false
  }
}],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
