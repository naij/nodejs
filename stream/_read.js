var http = require('http');
var Readable = require('stream').Readable;

var server = http.createServer(function (req, res) {
    if (req.url != '/favicon.ico') {
        var rs = new Readable();
        var c = 97;
        rs._read = function () {
            rs.push('微');
            c++;
            if (c > 99) rs.push(null);
        };
         
        rs.pipe(res);
    }
});
server.listen(8000);


// var server = http.createServer(function (req, res) {
//     if (req.url != '/favicon.ico') {
//         var rs = new Readable();
//         var c = 1;

//         rs._read = function () {
//             rs.push('abc');
//             c++;
//             if (c > 3) rs.push(null);
//         };
         
//         rs.on('readable', function () {
//             var i = 0;
//             var chunk;
//             // chunk = rs.read(3)
//             console.log(i++);
//             console.log(rs._readableState.ended);

//             while (null !== (chunk = rs.read(3))) {
//                 console.log(chunk);
//                 // res.write(chunk);
//             }
//         });
//     }
// });
// server.listen(8000);