var config = require("./config.js");
console.log(config);

// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:3001/tjjy'; // 数据库为 tjjy
//
// var insertData = function(db, callback) {
//     //连接到表 site
//     var collection = db.collection('user');
//     //插入数据
//     var data = [{"name":"余乾","password":"123456"}];
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
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//         console.log(err);
//             console.log(db);
//     insertData(db, function(result) {
//         console.log(result);
//         db.close();
//     });
// });
