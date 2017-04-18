// function hello() {
//     console.log('Hello, world!');
// }

// function greet(name) {
//     console.log('Hello, ' + name + '!');
// }

// function hello() {
//     console.log('Hello, world!');
// }

// exports.hello = hello;
// exports.greet = greet;


var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
// event.on('some_event',function(){
//     console.log('some_event 事件触发');
// });
// setTimeout(function(){
//     event.emit('some_event');
// },1000)
var fun = function(arg1,arg2){
    console.log('listener1',arg1,arg2)
}
var fun2 = function(arg1,arg2){
 console.log('listener2',arg1,arg2)   
}
var fun3 = function(msg){
 console.log('输出的信息为:'+msg);
}
event.listenerCount('emitter','someEvent')
event.on('someEvent',fun)
event.on('someEvent',fun2)
event.on('some',fun3)
event.removeListener('someEvent', fun2);// 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器， 第一个参数为事件名称  第二个是回调函数的名称   removeAllListeners([event])移除所以的监听器  setMaxListeners(n) 用于提高监听器的数量

event.emit('someEvent','arg1 参数','arg2 dddd');
event.emit('some','输出成功')
//  on 用于绑定事件函数  emit触发一个事件
//addlistener(event,listener)

var list1 = function listener1(){
    console.log('监听事件1')
}
var list2 = function listener2(){
    console.log('监听事件2')
}
//绑定connertion事件处理list1
event.addListener('connection',list1);
event.on('connection',list2);
var events = 




