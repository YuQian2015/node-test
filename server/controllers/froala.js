let express = require('express');
let router = express.Router();
let multer  = require('multer');
let response = require('../middlewares/response');


var froalaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.FROALA_UPLOAD_IMG_DIR)
  },
  filename: function (req, file, cb) {
    console.log(cb);
    cb(null, file.originalname)
  }
})
router.use(multer({storage: froalaStorage}).single('file'))
router.post('/upload', function(req, res) {

  console.log(req); // 上传的文件信息
  /** When using the "single"
    data come in "req.file" regardless of the attribute "name". **/
  console.log(req.file); // 上传的文件信息
  try {

    var response = {
      message: 'File uploaded successfully',
      filename: req.file.originalname,
      url:config.FROALA_IMG_URL+req.file.originalname,
      link:config.FROALA_IMG_URL+req.file.originalname,
    };
    res.end(JSON.stringify(response));
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
