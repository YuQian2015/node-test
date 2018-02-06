let express = require('express');
let router = express.Router();
let ImageTags = require('../models/imageTags');

let response = require('../middlewares/response');

router.get('/getImageTags', function(req, res) {
  ImageTags.find().lean().exec(function(err, tags) {
    if (err) {
      return res.json(response({"errorCode": "001"}));
    }
    if (!tags) {
      return res.status(404).json(response({"errorCode": "404"}));
    }
    res.json(response({
      "data": {
        result: tags
      }
    }));
  })
});

router.post('/addImageTags', function(req, res) {

  let {tag, tagName} = req.body;
  let tags = new ImageTags({
    tag: tag,
    tagName: tagName
  });

  tags.save(function(err, data) {
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
