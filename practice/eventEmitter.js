// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

eventEmitter.on('some_event', function() {
	console.log('some_event 事件触发');
});
setTimeout(function() {
	eventEmitter.emit('some_event');
}, 1000);


eventEmitter.on('someEvent', function(arg1, arg2) {
	console.log('listener1', arg1, arg2);
});
eventEmitter.on('someEvent', function(arg1, arg2) {
	console.log('listener2', arg1, arg2);
});
eventEmitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
