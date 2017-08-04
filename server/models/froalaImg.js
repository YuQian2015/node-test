let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('FroalaImg', new Schema({
  url: String,
  thumb: String,
  tag: String,
  name: String,
  id: String,
}));
