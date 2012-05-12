var server = require('./server');
var router = require('./router');
var requireHandler = require('./requireHandler');

var handler = [];
handler['/'] = requireHandler.start;
handler['/upload'] = requireHandler.upload;

server.start(router.route,handler);