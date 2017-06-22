var path = require('path');
var http = require('http');
var express = require('express');
// var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require("fs");

var app = express();
// var multipartMiddleware = multipart();

//设置静态资源
app.use(express.static(path.resolve(__dirname, '../client')));

// need to use the https://www.npmjs.org/package/body-parser module to parse the body of POST request.
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(multer({ dest: '/tmp/'}).array('image'));

//创建服务
var server = http.createServer(app);
server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});


var mongo = require('./MongoClient');
mongo.connect(function (db) {
  app.post('/listUsers', function (req, res) {
    if(!req.body.name){
      res.json({
        msg:'用户名为空',
        success:false,
        data:[],
        status:'0'
      })
      res.end();
      return;
    }
    if(!req.body.email){
      res.json({
        msg:'邮箱地址为空',
        success:false,
        data:[],
        status:'0'
      })
      res.end();
      return;
    }
    if(!req.body.password){
      res.json({
        msg:'密码为空',
        success:false,
        data:[],
        status:'0'
      })
      res.end();
      return;
    }
    var data = {
      "email":req.body.email,
      "password":req.body.password,
      "createDate":new Date()
    };
    //连接到表 tjjy
    //创建user集合
    var collection = db.collection('user');
    //插入数据
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            res.status(err.status).end();
            return;
        }
        console.log(result.ops);
        //db.close();
        res.json(result.ops)
        res.end();
    });
  });

  //db.close();

  // app.post('/uploadFile', multipartMiddleware, function(req, res) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   console.log('get FormData Params: ', req.body);
  //   res.json({result: 'success', data: req.body});
  // });

  app.post('/uploadFile', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully',
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
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
