var http = require('http');
var fs = require('fs');
// var heapdump = require('heapdump');

var server = http.createServer(function (req, res) {
    if (req.url != '/favicon.ico') {
        var stream = fs.createReadStream(__dirname + '/data.txt');
        stream.on('data', function (chunk) {
            stream.pause();

            setTimeout(function () {
                console.log('现在数据再次流动' + chunk.length);
                stream.resume();
            }, 100);
        });
        stream.on('end', function () {
            console.log('读取完毕');
        });
    }
});
server.listen(8000);