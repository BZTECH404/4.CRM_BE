// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    createdAt: {
        type: Date,
        default:Date.now()
    },
    question:{
        type:String,
    },
    type:{
        type:String,
        default:"Text"
    },
    order:{
        type:String,
        default:"9999"
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
