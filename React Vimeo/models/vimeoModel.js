const mongoose = require('mongoose');

const vimeoSchema = new mongoose.Schema({
  videoID: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
},{
    timestamps: true
  });

module.exports = mongoose.model('vimeo', vimeoSchema);



