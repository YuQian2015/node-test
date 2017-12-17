var buf = new Buffer(10);
console.log(buf);
var buf2 = new Buffer([10, 20, 30, 40, 50]);
console.log(buf2);
var buf3 = new Buffer("www.runoob.com", "utf-8");
//utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。
console.log(buf3);

var buf4 = new Buffer(256);
len = buf4.write("www.runoob.com");
console.log("写入字节数 : "+  len);

var buf5 = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf5[i] = i + 97;
}

console.log( buf5.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf5.toString('ascii',0,5));   // 输出: abcde
console.log( buf5.toString('utf8',0,5));    // 输出: abcde
console.log( buf5.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde


var buf6 = new Buffer('www.runoob.com');
var json = buf6.toJSON();

console.log(json);


var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());


var buffer4 = new Buffer('ABC');
var buffer5 = new Buffer('ABCD');
var result = buffer4.compare(buffer5);

if(result < 0) {
   console.log(buffer4 + " 在 " + buffer5 + "之前");
}else if(result == 0){
   console.log(buffer4 + " 与 " + buffer5 + "相同");
}else {
   console.log(buffer4 + " 在 " + buffer5 + "之后");
}
