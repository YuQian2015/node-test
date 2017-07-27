let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let multer  = require('multer');
global.config = require('./config/config');
global.process.env.PORT = config.port;
global.process.env.IP = config.server;

let cors = require('./middlewares/cors');

let jwt = require('jsonwebtoken');
let User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect(global.config.mongoDB);

// 连接成功
mongoose.connection.on('connected', function() {
  console.log('Mongoose连接到' + global.config.mongoDB);
});

// 连接异常
mongoose.connection.on('error', function(err) {
  console.log('Mongoose连接错误: ' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose连接断开');
});



//设置静态资源
// GET /javascripts/jquery.js
// GET /style.css
// GET /favicon.ico
app.use(express.static(path.resolve(__dirname, '../public')));

/** 设置跨域
Seting up server to accept cross-origin browser requests */

//使用cors允许跨域
// var cors = require('cors')
app.use(cors())

// need to use the https://www.npmjs.org/package/body-parser module to parse the body of POST request.
// If you want the headers to show up for static files as well, try this (make sure it's before the call to use(express.static()):
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//设置multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_IMG_DIR)
  },
  filename: function (req, file, cb) {
    console.log(cb);
    cb(null, file.originalname)
  }
})
app.use(multer({storage: storage}).array('files'));

app.use('/api',require('./controllers'));

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function() {
  console.log('Server running');
});
