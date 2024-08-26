// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const formatSchema = new Schema({
    createdAt: {
        type: Date,
    },
    agency:{
        type:String,
    },
    type: {
        type: String
    },
    description: {
        type: String,
    },
    previous: [
        {
            name: {
                type: String
            },
            file: {
                type: String
            }
        }
    ],
    urls: [{
        name: {
            type: String
        },
        file: {
            type: String
        }
    }],
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const format = mongoose.model('format', formatSchema);

module.exports = format;
