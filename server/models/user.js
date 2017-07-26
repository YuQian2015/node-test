var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  email: String,
  password: String,
  name: String,
  sex: String,
  userType: String,
  avatar: String,
  createDate: Date,
  userNo: String
}));
