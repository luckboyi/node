// // const http = require('http');

// // const hostname = '127.0.0.1';
// // const port = 3000;

// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World\n');
// // });

// // server.listen(port, hostname, () => {
// //   console.log(`服务器运行在 http://${hostname}:${port}/`);
// // });

var http = require('http');
http.createServer(function(request,response){
	//发送http头部
	//http状态值为200 ok
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('hello world\n');
}).listen(8888);

  //const 定义的变量

  console.log('server running at http://127.0.0.1:8888/');
  console.log('hello word');



// //   var express = require('express');

// // //阻塞代码
// // var fs = require('fs');
// // var data = fs.readFileSync('input.txt');
// // console.log(data.toString());
// // console.log('over')
// // //非阻塞代码
// // var fs = require('fs');
// // fs.readFile('input.txt',function(err,data){
// //   if(err) return console.error(err);
// //   console.log(data.toString())
// // })
// // console.log('程序执行结束')

// //事情驱动模式
// var events = require('events');
// //创建eventEmitter 对象
// var eventEmitter = new events.EventEmitter();
// // 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。');
  
//    // 触发 data_received 事件 
//    eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
 
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");



// //
// var fs = require('fs');
// fs.readFile('input.text',function(err,data){
//   if(err){
//     console.log(err.stack);
//     return;
//   }
//   console.log(data.toString());

// })


// console.log('over')




// //eventemitter 类
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");



//buffer(缓冲区)
var buf = new Buffer(256);
len = buf.write('www.runbo.com');

console.log('写入字节数：'+ len);
//console.log('写入字节数：'+ buf.length);
//读取缓冲区数据

// msg = buf.toString([encoding[,start[,end]]])
for(var i = 0 ; i <26 ; i++){
  buf[i] = i+ 97;
}
console.dir(buf.toString('ascii'));
console.dir(buf.toString('ascii',0,5));
console.dir(buf.toString('utf8',0,5));
console.dir(buf.toString(undefined,0,5));


var buffer1 = new Buffer('菜鸟教程');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log('buffer3的内容:'+buffer3.toString());

var result = buffer1.compare(buffer2);
if(result <0){
  console.log(buffer1 + '在'+buffer2 +'之前');
}else if(result  == 0){
  console.log(buffer1 + '在'+buffer2 +'相同');
  
}else{
  console.log(buffer1 + '在'+buffer2 +'之后');  
}

var buffer4 = new Buffer(3);
buffer1.copy(buffer4);
console.dir('buffer4 content:'+ buffer4.toString());

var buffer5 = buffer2.slice(0,2);
console.dir('buffer5 content:'+ buffer5.toString());



var fs = require('fs');
var data = '' ;
//创建可读流
var readerStream = fs.createReadStream('input.txt');
//设置编码为utf8
readerStream.setEncoding('UTF8');
//处理流事件
readerStream.on('data',function(chunk){
  data += chunk ;
})
readerStream.on('end',function(){
  console.dir(data);
})
readerStream.on('error',function(err){
  console.dir(err.stack);
})
console.dir('执行完毕')


//写入 流
var data = '这是写入流的demo'
var writerStream = fs.createWriteStream('output.txt');
writerStream.write(data,'UTF8');
writerStream.end();
writerStream.on('finish',function(){
  console.dir('写入完成');
})
writerStream.on('error',function(err){
  console.dir(err.stack);
})
console.log('程序执行完毕')


//管道流
//创建一个可读流
var fs2 = fs.createReadStream('input.txt');
//创建一个可写流
var fs3 = fs.createWriteStream('out.txt');
fs2.pipe(fs3);
console.log('执行over');



//链式流
var zlib = require('zlib');
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  console.log('压缩完成')


  fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream('inputxx.txt'));
      console.log('解压完成')