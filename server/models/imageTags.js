let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tagSchema = new Schema({
  tag: Number,
  tagName: String,
});

module.exports = mongoose.model('Tags', tagSchema);
