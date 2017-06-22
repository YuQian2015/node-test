var config = require("../config.js");

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = config.mongoDB; // 数据库为 tjjy

var connect = {
  connect:function(callback) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      if(err){
        console.log(err);
        return;
      }
      console.log("连接数据库成功！");
      if(callback && typeof(callback)=="function"){
        callback(db);
      }
    });
  }
}
module.exports = connect;
// var insertData = function(db, callback) {
//     //连接到表 tjjy
//     //创建user集合
//     var collection = db.collection('user');
//     //插入数据
//     var data = [{"name":"余乾","password":"123456",createDate:new Date()}];
//     collection.insert(data, function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }
//         callback(result);
//     });
// }
//
// insertData(db, function(result) {
//     console.log(result);
//     db.close();
// });
