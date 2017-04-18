// exports.world = function(){
//     console.log('hello world')
// }

//模块系统
// function hello(){
//     var name;
//     this.setName = function(thyName){
//         name = thyName;
//     }
//     this.sayHello = function(){
//         console.log('hello,'+name);
//     }
// }
// module.exports = hello;


// //函数
// function say(val){
//     console.log(val)
// }
// function execute(somFun,val){
//     somFun(val)
// }
// execute(say,'hello,world!')


//匿名函数
// function execute(somFun,val){
//     somFun(val)
// }
// execute(function(world){console.log(world)},'hello,world!')

//函数传递是如何http服务器
var http = require('http');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('hello,world!');
    response.end();
}).listen(8888);
