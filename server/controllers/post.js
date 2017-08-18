let express = require('express');
let router = express.Router();
let response = require('../middlewares/response');

let Post = require('../models/post');

router.post('/getPost', function(req, res) {
  let userId = req.body.userId;
  let query = {
    _id: req.body.postId
  };
  Post.findOneAndUpdate(query, {
    $inc: {
      pageviews: 1
    }
  }, {new: true}).lean().exec(function(err, post) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    if (!post || (!post.visible && (userId !== post.authorId))) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    res.json(response({
      "data": {
        result: post
      }
    }));
  })
});

router.post('/likePost', function(req, res) {
  let query = {
    _id: req.body.postId
  };

  Post.findOneAndUpdate(query, {
    $inc: {
      likes: 1
    }
  }, {new: true}).lean().exec(function(err, post) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    if (!post) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    res.json(response({
      "data": {
        result: "成功"
      }
    }));
  })
});

router.post('/getPostList', function(req, res) {
  let pageSize = req.body.pageSize || 10;
  let page = req.body.page || 1;
  Post.find().limit(pageSize).skip(pageSize * (page - 1)).sort({createDate: -1}).lean().exec(function(err, post) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    if (!post) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    Post.count().exec(function(err, count) {
      let totalPage = Math.ceil(count/pageSize),
          next = (totalPage>page)?true:false,
          previous = (page>1)?true:false;


      res.json(response({
        "data": {
          result: post,
          pageSize,
          page,
          count,
          totalPage,
          next,
          previous
        }
      }));
    })
  })
});
module.exports = router;
