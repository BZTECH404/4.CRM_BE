const mongoose = require('mongoose');
const { Schema } = mongoose;

const templateSchema = new Schema({
    pages: [{
        type: Object,
        // required: true
    }],
    masterinput: [{
        type: Object,
        // required: true
    }],
    name: {
        type: String,
        // required:true
    },
    subject: {
        type: String,
        default: "No Subject"
    },
    // scheme: {
    //     type: String,
    //     // required:true
    // },
    // rulebook: {
    //     type: String,
    //     // required:true
    // },
    description: {
        type: String,
        // required:true
    },
    templateId: {
        type: Schema.Types.ObjectId,
        ref: 'Template',
        // required: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required:true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    // tags: [{
    //     type: String
    // }],
    // favourites:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // }],
    // likedby:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // }],
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    // quotes: [{
    //     text: {
    //       type: String,
    //       required: true
    //     },
    //     author: {
    //       type: String,
    //       required: true
    //     }
    //   }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]

});
const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
