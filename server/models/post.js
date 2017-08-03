let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema({
  authorName: String,
  authorId:String,
  createDate: Date,
  modifyDate: Date,
  isDelete: Boolean,
  visible: Boolean,
  pageviews: Number,
  source:String,
  likes:Number,
  tags: Array,
  description:String,
  content:String,
  typeCode:String,
  title:String,
  cover:String
}));
