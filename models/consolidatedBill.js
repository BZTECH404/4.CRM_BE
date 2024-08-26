// models/projectModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConsolidatedSchema = new Schema({
    createdAt: {
        type: Date,
        default:Date.now()
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default:null
    },
    stage:{
        type: String
    },
    total_amount: {
        type: Number
    },
    amount_stage:{
        type: Number
    },
    amount_recieved:{
        type: Number
    },
    // Lumpsum,Percentage or Sqft
    type: {
        type: String
    },
    urls: [{
        name: {
            type: String
        },
        file: {
            type: String
        }
    }],
    previous: [{
        name: {
            type: String
        },
        file: {
            type: String
        }
    }],
    description:{
        type:String
    },
    isDisabled:{
        type:Boolean,
        default:false
    }

});

const Consolidated = mongoose.model('consolidated', ConsolidatedSchema);

module.exports = Consolidated;
