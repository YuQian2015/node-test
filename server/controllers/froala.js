let express = require('express');
let router = express.Router();
let multer  = require('multer');
let response = require('../middlewares/response');
let thumb = require('node-thumbnail').thumb;

let FroalaImg = require('../models/froalaImg');

//设置multer
var froalaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.FROALA_UPLOAD_IMG_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +'.'+ file.originalname.match(/[^\.]\w*$/)[0])
  }
})
router.use(multer({storage: froalaStorage}).single('file')) //单个文件，字段名为file


router.post('/uploadImage', function(req, res) {// 上传的文件信息,When using the "single" data come in "req.file" regardless of the attribute "name".

  let img = new FroalaImg({
      url: config.FROALA_IMG_URL+req.file.filename,
      thumb: config.FROALA_IMG_THUMB_URL+req.file.filename,
      tag: 'default',
      name: req.file.originalname,
      id: Date.now(),
  });

  try {
    // thumb(options, callback);
    const response = {
      message: 'success',
      filename: req.file.originalname,
      url:config.FROALA_IMG_URL+req.file.filename,
      link:config.FROALA_IMG_URL+req.file.filename,
      thumb:config.FROALA_IMG_THUMB_URL+req.file.filename
    };


    thumb({
      source: config.FROALA_UPLOAD_IMG_DIR+req.file.filename,
      destination: config.FROALA_UPLOAD_IMG_THUMB_DIR,
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



  } catch (err) {
    res.sendStatus(400);
  }
});

router.post('/imageManager', function(req, res) {
  FroalaImg.find().lean().exec(function(err, imgs) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    res.json(imgs);
  })
});
router.post('/deleteImage', function(req, res) {
  FroalaImg.remove({ id: req.body.id }, function (err) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    res.json({result:'success'});
  });
});

module.exports = router;
