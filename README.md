克隆项目
执行npm install 安装
执行npm mongo 启动mongo数据库
执行npm test启动node服务并连接数据库
执行npm run dev 启动项目
npm install --only=dev

npm install --global webpack webpack-dev-server

## CORS on ExpressJS

In your ExpressJS app on node.js, do the following with your routes:

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
------------------------------------------------------------------------------------------
In your ExpressJS app on node.js, do the following with your routes:

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
The first call (app.all) should be made before all the other routes in your app (or at least the ones you want to be CORS enabled).

[Edit]

If you want the headers to show up for static files as well, try this (make sure it's before the call to use(express.static()):

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
I tested this with your code, and got the headers on assets from the public directory:

var express = require('express')
  , app = express.createServer();

app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler());
});

app.listen(8888);
console.log('express running at http://localhost:%d', 8888);
You could, of course, package the function up into a module so you can do something like

// cors.js

module.exports = function() {
  return function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  };
}

// server.js

cors = require('./cors');
app.use(cors());


## I found the easiest way is to use the node.js package cors. The simplest usage is:

var cors = require('cors')

var app = express()
app.use(cors())
