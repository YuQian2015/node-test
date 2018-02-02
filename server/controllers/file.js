let express = require('express');
let router = express.Router();
let multer = require('multer');
let response = require('../middlewares/response');
let thumb = require('node-thumbnail').thumb;

let Images = require('../models/images');

//设置multer，用于上传图片
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.UPLOAD_IMG_DIR)
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.match(/[^\.]\w*$/)[0])
  }
})
router.use(multer({storage: storage}).array('files', 12));

router.post('/uploadImage', function(req, res) {
  let total = req.files.length,
    result = [],
    responseArray = [];

  function saveAll() {
    let doc = req.files.shift();
    let img = new Images({
      url: config.IMG_URL + doc.filename,
      thumb: config.IMG_THUMB_URL + doc.filename,
      tag: 0,
      tagName: 'default',
      name: doc.originalname
    });

    try {
      let currentImage = {
        message: 'success',
        filename: doc.filename,
        name: doc.originalname,
        url: config.IMG_URL + doc.filename,
        thumb: config.IMG_THUMB_URL + doc.filename
      };

      thumb({
        source: config.UPLOAD_IMG_DIR + currentImage.filename,
        destination: config.UPLOAD_IMG_THUMB_DIR,
        concurrency: 4,
        prefix: '',
        suffix: '',
        digest: false,
        // hashingType: 'sha1',  'sha1', 'md5', 'sha256', 'sha512'
        width: 200,
        quiet: false, // if set to 'true', console.log status messages will be supressed
        overwrite: false,
        // basename: undefined,  basename of the thumbnail. If unset, the name of the source file is used as basename.
        // ignore: false,  Ignore unsupported files in "dest"
        logger: function(message) {
          console.log(message);
        }
      }, function(files, err, stdout, stderr) {
        // img.save(function(error, data) {
        //   if (error) {
        //     return res.json(response({"errorCode": "000"}));
        //   }
        //   res.end(JSON.stringify(response));
        // })
        img.save(function(err, saved) {
          if (err) {
            throw err; //handle error
          }
          responseArray.push(currentImage)
          result.push(saved[0]);

          if (--total) {
            saveAll();
          } else {
            // all saved here
            res.json(response({
              "data": {
                result: responseArray
              }
            }));
            console.log('All done!');
          }
        })
      });
    } catch (err) {
      res.sendStatus(400);
    }
  }
  saveAll();
});

router.post('/imageManager', function(req, res) {
  Images.find().lean().exec(function(err, imgs) {
    if (err) {
      return res.json(response({"errorCode": "000"}));
    }
    res.json(imgs);
  })
});

module.exports = router;
