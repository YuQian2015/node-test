let express = require('express');
let router = express.Router();
let multer  = require('multer');
let response = require('../middlewares/response');
let thumb = require('node-thumbnail').thumb;

let Images = require('../models/images');

//设置multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_IMG_DIR)
  },
  filename: function (req, file, cb) {
    console.log(cb);
    cb(null, Date.now() +'.'+ file.originalname.match(/[^\.]\w*$/)[0])
  }
})
router.use(multer({storage: storage}).array('files'));




router.post('/uploadImage', function(req, res) {
  let img = new Images({
      url: config.IMG_URL+req.files[0].filename,
      thumb: config.IMG_THUMB_URL+req.files[0].filename,
      tag: 'default',
      name: req.files[0].originalname,
      id: Date.now(),
  });

  console.log(req.files[0]); // 上传的文件信息
  try {
    const response = {
      message: 'success',
      filename: req.files[0].originalname,
      url:config.IMG_URL+req.files[0].filename,
      thumb:config.IMG_THUMB_URL+req.files[0].filename
    };


    thumb({
      source: config.UPLOAD_IMG_DIR+req.files[0].filename,
      destination: config.UPLOAD_IMG_THUMB_DIR,
      concurrency: 4,
      prefix: '',
      suffix: '',
      digest: false,
      // hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512'
      width: 200,
      quiet: false, // if set to 'true', console.log status messages will be supressed
      overwrite: false,
      // basename: undefined, // basename of the thumbnail. If unset, the name of the source file is used as basename.
      // ignore: false, // Ignore unsupported files in "dest"
      logger: function(message) {
        console.log(message);
      }
    }, function(files, err, stdout, stderr) {
      img.save(function(error, data) {
        if (error) {
          return res.json(response({"errorCode": "000"}));
        }
        res.end(JSON.stringify(response));
      })
      console.log('All done!');
    });






    // var response = {
    //   message: 'File uploaded successfully',
    //   filename: req.files[0].originalname,
    //   url:config.IMG_URL+req.files[0].originalname,
    // };
    // res.end(JSON.stringify(response));
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
