const mongoose = require('mongoose');
const { Schema } = mongoose;

const filetemplateSchema = new Schema({
    name:{
        type:String,
    },
    type:{
        type:String,
    },
    html:{
        type:String
    },
    inputValues:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()}
});

const Template = mongoose.model('filetemplate', filetemplateSchema);

module.exports = Template;
