// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
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
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        default: null

    },
    description: {
        type: String,
    },
    subject: {
        type: String
    },
    tds:{
        type: String,
        default:''
    },
    gst:{
        type: String,
        default:''
    },
    files: [{
        order: {
            type: Number,
            default: 0
        },
        uploaddate: {
            type: Date,
            default: Date.now()
        },
        date: {
            type: Date,
            default: Date.now()
        },
        filename: {
            type: String
        },
        current: {
            type: String
        },
        prevlinks: [{
            type: String
        }],
        isDisabled: {
            type: Boolean,
            default: false
        }
    }],
    isDisabled: {
        type: Boolean,
        default: false
    },
    deletedtimes:[{
        type:Date
    }]
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
