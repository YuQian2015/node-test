var appConfig = {
  server:"127.0.0.1",
  port:3000,


  mongoDB:"mongodb://localhost:3001/tjjy",
  jwt_secret:"tjjy",


  // api
  register:"/api/register",

  uploadFile:"/api/uploadFile"
}

module.exports = appConfig;
