var server = require("./server");
var router = require("./router");
var handler = require("./requestHandlers");

server.start(router.route,handler.handle);