const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name :{
        type:String ,
        required :[true ,"Category name is required"],
        unique : true ,
        trim : true ,
    },
    slug:{
  type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  isCustomizable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('category',categorySchema);