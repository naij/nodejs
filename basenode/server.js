var http = require('http');
var url = require('url');

function start(route,handle){
    http.createServer(function(req,res){

        var postData = '';
        var pathname = url.parse(req.url).pathname;
        console.log('require for' + pathname);

        req.setEncoding('utf-8');

        req.addListener('data',function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });

        req.addListener('end',function(){
            route(pathname,handle,res,postData);
        }); 
            
    }).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
