let express = require('express');
let app = express();
let bodyParser  = require('body-parser');
let mongoose    = require('mongoose');
global.config = require('./config/config');

let jwt    = require('jsonwebtoken');
let User   = require('./models/user');


mongoose.Promise = global.Promise;
mongoose.connect(global.config.mongoDB);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + global.config.mongoDB);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});




app.use(bodyParser.json());

app.use(require('./controllers'));

app.listen(3000, function(){
    console.log('App running on 3000');
});
