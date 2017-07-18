var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');

//定义接口
var user = require("./api/user.js")
var fileUploader = require("./api/fileUploader.js")

//数据库设置
var mongo = require('./MongoClient');

var app = express();

//使用cors允许跨域
// var cors = require('cors')
// app.use(cors())


//设置静态资源
app.use(express.static(path.resolve(__dirname, '../public')));

/** 设置跨域
Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});




// need to use the https://www.npmjs.org/package/body-parser module to parse the body of POST request.
// If you want the headers to show up for static files as well, try this (make sure it's before the call to use(express.static()):
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//设置multer
app.use(multer({ dest: '/tmp/'}).array('image'));

//创建服务
var server = http.createServer(app);
server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});


mongo.connect(function (db) {

  // app.all('*', function(req, res, next) {
  //   //The first call (app.all) should be made before all the other routes in your app (or at least the ones you want to be CORS enabled).
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type');
  //   // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //
  //   // res.header("X-Powered-By",' 3.2.1')
  //   // res.header("Content-Type", "application/json;charset=utf-8");
  //   next();
  //  });

  user(app,db);
  fileUploader(app);
});

//
// //添加的新用户数据
// var user = {
//    "user4" : {
//       "name" : "mohit",
//       "password" : "password4",
//       "profession" : "teacher",
//       "id": 4
//    }
// }
//
// app.get('/addUser', function (req, res) {
//    // 读取已存在的数据
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        data = JSON.parse( data );
//        data["user4"] = user["user4"];
//        console.log( data );
//        res.end( JSON.stringify(data));
//    });
// })
//
// var id = 2;
//
// app.get('/deleteUser', function (req, res) {
//
//    // First read existing users.
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        data = JSON.parse( data );
//        delete data["user" + 2];
//
//        console.log( data );
//        res.end( JSON.stringify(data));
//    });
// })
// app.get('/:id', function (req, res) {
//    // 首先我们读取已存在的用户
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        data = JSON.parse( data );
//        var user = data["user" + req.params.id]
//        console.log( user );
//        res.end( JSON.stringify(user));
//    });
// })
