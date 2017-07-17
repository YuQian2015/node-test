var config = require("../../config.js");
var user = function(app,db){
  app.post(config.register, function (req, res) {
    console.log(req)
    console.log(req.body)
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
      "name":req.body.name,
      "email":req.body.email,
      "key":req.body.password,
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
}

module.exports = user;
