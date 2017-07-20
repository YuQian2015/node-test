let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let User = require('../models/user');

let response = require('../middlewares/response');
router.post('/signup', function(req, res) {
  let user = new User({email: req.body.email, password: req.body.password, name: req.body.name, createDate: new Date()});
  user.save(function(err, data) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    res.json(response({"data": {result:"注册成功"}}));
  })
});

router.post('/signin', function(req, res) {
  let data = {
    email: req.body.email,
    password: req.body.password
  };
  User.findOne(data).lean().exec(function(err, user) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    if (!user) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    let token = jwt.sign(user, global.config.jwt_secret, {
      expiresIn: 14400 // 保留时间
    });
    res.json(response({
      "data": {
        result: user,
        token: token
      }
    }));
  })
});

module.exports = router;
