let express = require('express');
let router = express.Router();
let multer  = require('multer');
let response = require('../middlewares/response');
let thumb = require('node-thumbnail').thumb;

//设置multer
var froalaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.FROALA_UPLOAD_IMG_DIR)
  },
  filename: function (req, file, cb) {
    console.log(cb);
    cb(null, file.originalname)
  }
})
router.use(multer({storage: froalaStorage}).single('file')) //单个文件，字段名为file
router.post('/upload', function(req, res) {

  console.log(req); // 上传的文件信息
  /** When using the "single"
    data come in "req.file" regardless of the attribute "name". **/
  console.log(req.file); // 上传的文件信息
  try {
    // thumb(options, callback);
    const response = {
      message: 'File uploaded successfully',
      filename: req.file.originalname,
      url:config.FROALA_IMG_URL+req.file.originalname,
      link:config.FROALA_IMG_URL+req.file.originalname,
      thumb:config.FROALA_IMG_THUMB_URL+req.file.originalname
    };
    thumb({
      source: config.FROALA_UPLOAD_IMG_DIR+req.file.originalname,
      destination: config.FROALA_UPLOAD_IMG_THUMB_DIR,
      concurrency: 4,
      prefix: '',
      // suffix: '_thumb',
      digest: false,
      // hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512'
      width: 100,
      quiet: false, // if set to 'true', console.log status messages will be supressed
      overwrite: false,
      // basename: undefined, // basename of the thumbnail. If unset, the name of the source file is used as basename.
      // ignore: false, // Ignore unsupported files in "dest"
      logger: function(message) {
        console.log(message);
      }
    }, function(files, err, stdout, stderr) {
      console.log('All done!');
    });
    res.end(JSON.stringify(response));
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
