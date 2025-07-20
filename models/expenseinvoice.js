// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        default: 0
    },
    amount_paid: {
        type: Number,
        default: 0
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    type: {
        type: String
    },
    company: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    description: {
        type: String,
    },
    subject: {
        type: String
    },
    recurring: {
        type: Schema.Types.ObjectId,
        ref: 'Recurring',
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
    status: {
        type: String,
        default: "Not Paid"
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    autopay:{
        type:Boolean,
        default:false
    },
    deletedtimes: [{
        type: Date
    }]
});

const ExpenseInvoice = mongoose.model('ExpenseInvoice', InvoiceSchema);

module.exports = ExpenseInvoice;
