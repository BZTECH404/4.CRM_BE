// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecurringSchema = new Schema({
    createdAt:{
        type:Date,
        default:Date.now()
    },
    date:{
        type:Date,
        default:Date.now()
    },
    name:{
        type:String
    },
    amount:{
        type:Number,
        default:0
    },
    frequency:{
        type:String
    },
    description:{
        type:String
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:'Project'
    },
    // finance
    owner:{
        type:Schema.Types.ObjectId,
        ref:'Contact'
    },
    type:{
        type:String
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    lastRun:{
        type:Date,
        
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
    
  
 
});

const Recurring = mongoose.model('Recurring', RecurringSchema);

module.exports = Recurring;
