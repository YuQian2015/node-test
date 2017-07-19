let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.get('/', function(req, res){
    res.json(req.decoded);
});

router.post('/getUser', function(req, res){
  let data = {
      email: req.body.email,
  };
  User.findOne(data).lean().exec(function(err, user){
      if(err){
          return res.json({error: true});
      }
      if(!user){
          return res.status(404).json({'message':'User not found!'});
      }
      console.log('--------------------------------------------------------------------------------');
      console.log(user);
      let token = jwt.sign(user, global.config.jwt_secret, {
          expiresIn: 14400 // expires in 1 hour
      });
      res.json({error:false, token:token});
  })
});

module.exports = router;
