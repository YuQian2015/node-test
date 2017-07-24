let fs = require("fs");
let express = require('express');
let router = express.Router();
let response = require('../middlewares/response');



router.post('/upload', function (req, res) {

 console.log(req.files[0]);  // 上传的文件信息

 var des_file = __dirname + "/upload/" + req.files[0].originalname;
 fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
       if( err ){
            console.log( err );
       }else{
            var response = {
                 message:'File uploaded successfully',
                 filename:req.files[0].originalname
            };
            console.log( response );
            res.end( JSON.stringify( response ) );
        }
     });
 });
});

module.exports = router;
