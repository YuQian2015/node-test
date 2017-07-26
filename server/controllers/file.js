let express = require('express');
let router = express.Router();
let response = require('../middlewares/response');

router.post('/upload', function(req, res) {

  console.log(req.files[0]); // 上传的文件信息
  try {

    var response = {
      message: 'File uploaded successfully',
      filename: req.files[0].originalname
    };
    res.end(JSON.stringify(response));
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
