var appConfig = {
  server:"127.0.0.1",
  port:3000,


  mongoDB:"mongodb://localhost:3001/tjjy",
  jwt_secret:"tjjy",


  UPLOAD_IMG_DIR:"F:/project/tjjy/static/images",
  FROALA_UPLOAD_IMG_DIR:"F:/project/tjjy/static/images/froala",
  // UPLOAD_IMG_DIR:"D:/nginx/tjjy/static/images",
  // FROALA_UPLOAD_IMG_DIR:"D:/nginx/tjjy/static/images/froala",
  IMG_URL:"http://localhost:8089/static/images/",
  FROALA_IMG_URL:"http://localhost:8089/static/images/froala/"

}

module.exports = appConfig;
