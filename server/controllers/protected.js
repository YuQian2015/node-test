let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Post = require('../models/post');

let response = require('../middlewares/response');

router.post('/getUser', function(req, res) {
  let query = {
    _id: req.body.id
  };
  User.findOne(query).lean().exec(function(err, user) {
    if (err) {
      return res.json(response({"errorCode": "001"}));
    }
    if (!user) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    res.json(response({
      "data": {
        result: user
      }
    }));
  })
});

router.post('/completeUserInfo', function(req, res) {
  let query = {
    _id: req.body.id
  };
  User.findOneAndUpdate(query, {
    $set: {
      sex: req.body.sex,
      userType: req.body.userType,
      avatar: req.body.avatar,
      userNo: req.body.userNo
    }
  }).lean().exec(function(err, user) {
    if (err) {
      return res.json(response({"errorCode": "001"}));
    }
    if (!user) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    res.json(response({
      "data": {
        result: "成功"
      }
    }));
  })
});

router.post('/addPost', function(req, res) {
  console.log(req);
  console.log(req.body);

  let {name, _id} = req.decoded;
  let post = new Post({
    authorName: name,
    authorId: _id,
    createDate: new Date(),
    modifyDate: new Date(),
    isDelete: false,
    pageviews: 0,
    likes: 0,
  });
  post.source = req.body.source;
  post.tags = req.body.tags;
  post.description = req.body.description || '';
  post.content = req.body.content || '';
  post.typeCode = req.body.typeCode || '00';
  post.visible = req.body.visible || true;
  post.title = req.body.title || '';
  post.cover = req.body.cover || '';


  post.save(function(err, data) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    res.json(response({
      "data": {
        result: "添加成功"
      }
    }));
  })
});

module.exports = router;
