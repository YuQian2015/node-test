var appConfig = {
  server:"127.0.0.1",
  port:3000,


  mongoDB:"mongodb://localhost:3001/tjjy",
  jwt_secret:"tjjy",


  UPLOAD_IMG_DIR:"F:/project/tjjy/static/images/",//图片上传地址
  FROALA_UPLOAD_IMG_DIR:"F:/project/tjjy/static/images/froala/",//编辑器图片上传地址
  FROALA_UPLOAD_IMG_THUMB_DIR:"F:/project/tjjy/static/images/froala/thumb/",//编辑器图片预览地址
  // UPLOAD_IMG_DIR:"D:/nginx/tjjy/static/images/",
  // FROALA_UPLOAD_IMG_DIR:"D:/nginx/tjjy/static/images/froala/",
  // FROALA_UPLOAD_IMG_THUMB_DIR:"D:/nginx/tjjy/static/images/froala/thumb/",
  IMG_URL:"http://localhost:8089/static/images/",
  FROALA_IMG_URL:"http://localhost:8089/static/images/froala/",
  FROALA_IMG_THUMB_URL:"http://localhost:8089/static/images/froala/thumb/"

}

module.exports = appConfig;
