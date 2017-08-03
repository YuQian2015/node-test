let express = require('express');
let router = express.Router();
let multer  = require('multer');
let response = require('../middlewares/response');

//设置multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_IMG_DIR)
  },
  filename: function (req, file, cb) {
    console.log(cb);
    cb(null, file.originalname)
  }
})
router.use(multer({storage: storage}).array('files'));
router.post('/upload', function(req, res) {

  console.log(req.files[0]); // 上传的文件信息
  try {

    var response = {
      message: 'File uploaded successfully',
      filename: req.files[0].originalname,
      url:config.IMG_URL+req.files[0].originalname,
    };
    res.end(JSON.stringify(response));
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
