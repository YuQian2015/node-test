var fs = require("fs");

var data = fs.readFileSync('text.txt');
console.log(data);
console.log(data.toString());
console.log("程序执行结束!");

fs.readFile('text.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");
module.exports fileControl = {
  read:function(){
    var data = fs.readFileSync('text.txt');
    console.log(data);
    console.log(data.toString());
    console.log("程序执行结束!");
  }
};
