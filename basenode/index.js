var server = require('./server');
var router = require('./router');
var requireHandlers = require('./requireHandlers');

var handle = {};
handle['/'] = requireHandlers.start;
handle['/upload'] = requireHandlers.upload;

server.start(router.route,handle);
console.log('index.js')