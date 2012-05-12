var http = require('http');
var url = require('url');

function start(route,handler){
    http.createServer(function(req,res){
        var pathname = url.parse(req.url).pathname;
        console.log('require ' + pathname);
        route(req,res,pathname,handler);
    }).listen(8888);

    console.log("Server has started.");
}

exports.start = start;