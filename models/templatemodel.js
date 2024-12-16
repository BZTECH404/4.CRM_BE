const mongoose = require('mongoose');
const { Schema } = mongoose;

const templateSchema = new Schema({
    elements: [{
        type: Object,
        required: true
    }],
    date:{
        type:Date,
        default:Date.now()}
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
