var path = require('path');
var http = require('http');
var express = require('express');
var fs = require("fs");

var router = express();

//设置静态资源
router.use(express.static(path.resolve(__dirname, '../client')));


//创建服务
var server = http.createServer(router);
server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});



// router.get('/listUsers', function (req, res) {
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        console.log( data );
//        res.end( data );
//    });
// })
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
// router.get('/addUser', function (req, res) {
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
// router.get('/deleteUser', function (req, res) {
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
// router.get('/:id', function (req, res) {
//    // 首先我们读取已存在的用户
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        data = JSON.parse( data );
//        var user = data["user" + req.params.id]
//        console.log( user );
//        res.end( JSON.stringify(user));
//    });
// })
//
// var server = router.listen(8080, function () {
//
//   var host = server.address().address
//   var port = server.address().port
//
//   console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })
