const mongoose = require('mongoose');
const { Schema } = mongoose;

const correspondence = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref:'project'
  },
  subject:{
    type:String,
  },
  // This is to be Set By user
  date:{
    type:String,
    default:Date.now()
  },
  // This is to be Set for just when creation happened
  creationdate:{
    type:String,
    default:Date.now()
  },
  description:{
    type: String,
  },
  letterno:{
    type:String,
  },
  reffrom:[{
    ref:{
      type:String,
    },
    type:{
      type:String
    }
  }],
  refto:[{
    type:String
  }],
  enclosed:[{
    type:String
  }],
  type:{
    type:String
  },
  // link:{
  //   type:Schema.Types.ObjectId,
  //   default:null

  // },
  files: [{
    order:{
      type:Number,
      default:0
    },
    description:{
      type:String,
      default:""
    },
    date:{
      type:Date,
      default:Date.now()
    },
    filename:{
      type:String,
      default:""
    },
    current: {
      type: String,
      default:""

    },
    prevlinks: [{
      type: String
  }],
    isDisabled:{
      type:Boolean,
      default:false
    }
  }],
});

const Contact = mongoose.model('Correspondence', correspondence);

module.exports = Contact;