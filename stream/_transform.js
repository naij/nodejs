var http = require('http');
var Readable = require('stream').Readable;
var Transform = require('stream').Transform;

var server = http.createServer(function (req, res) {
    if (req.url != '/favicon.ico') {
        var rs = new Readable();
        var c = 97;
        rs._read = function () {
            rs.push(c++ + ' ');
            if (c > 99) rs.push(null);
        };

        var tf = new Transform();
        tf._transform = function (file, encoding, callback) {
            console.log(file);
            this.push(file);
            callback();
        }
         
        rs.pipe(tf).pipe(res);
    }
});
server.listen(8000);