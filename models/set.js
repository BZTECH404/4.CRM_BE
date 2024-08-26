
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetSchema = new Schema({
    createdAt: {
        type: Date,
        default:Date.now()
    },
    questions:[{
        type:String,
    }],
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const Set = mongoose.model('set', SetSchema);

module.exports = Set;
