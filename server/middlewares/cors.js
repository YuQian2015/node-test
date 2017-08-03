module.exports = function() {
  return function(req, res, next) { //allow cross origin requests
    console.log(req)
      res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Credentials", true);
      next();
  }
}
