let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
  url: String,
  thumb: String,
  tag: Number,
  tagName: String,
  name: String
});

module.exports = mongoose.model('Images', imageSchema);
