// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
    createdAt:{
        type:Date,
        default:Date.now()
    },
    amount:{
        type:Number,
        default:0
    },
    amount_paid:{
        type:Number,
        default:0
    },
    person:{
        type:Schema.Types.ObjectId,
        ref:'Contact'
    },
    company:{
        type:String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    description:{
        type:String,
    },
    subject:{
        type:String
    },
    urls:[{
        name:{
            type:String
        },
        file:{
        type:String
        }
    }],
    type:{
        type:String
    },
    isDisabled:{
        type:Boolean,
        default:false
    }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
