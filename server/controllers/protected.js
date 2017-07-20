let express = require('express');
let router = express.Router();
let User = require('../models/user');

let response = require('../middlewares/response');

// router.get('/', function(req, res){
//     res.json(req.decoded);
// });

router.post('/getUser', function(req, res){
  let query = {
      _id: req.body.id
  };
  User.findOne(query).lean().exec(function(err, user){
      if(err){
          return res.json(response({"errorCode":"001"}));
      }
      if(!user){
          return res.status(404).json(response({"errorCode":"404"}));
      }
      res.json(response({"data":{result:user}}));
  })
});

router.post('/completeUserInfo', function(req, res){
  let query = {
      _id: req.body.id
  };
  User.findOneAndUpdate(query,{ $set: {
      sex: req.body.sex,
      userType: req.body.userType,
      avatar: req.body.avatar,
      userNo: req.body.userNo
  }})
  .lean().exec(function(err, user){
      if(err){
          return res.json(response({"errorCode":"001"}));
      }
      if(!user){
          return res.status(404).json(response({"errorCode":"404"}));
      }
      res.json(response({"data":{result:"成功"}}));
  })
});


module.exports = router;
