// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeSchema = new Schema({
    createdAt: {
        type: Date,
    },
    amount: {
        type: Number
    },
    bank: {
        type: String
    },
    type: {
        type: String
    },
    company: {
        type: String,
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        default: null
    },

    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default: null

    },
    description: {
        type: String,
    },
    subject: {
        type: String
    },
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        default: null

    },
    tds:{
        type: String,
        default:''
    },
    gst:{
        type: String,
        default:''
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

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;
