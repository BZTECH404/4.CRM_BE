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
    order:{
        type:String
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
