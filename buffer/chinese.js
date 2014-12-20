var http = require('http');
var fs = require('fs');


/*
 * 用字符串拼接的方式会产生乱码问题
 * data += chunk  这步操作其实是做了data.toString() 和 chunk.toString()
 * 当chunk的长度不为3的倍数时，中文就会乱码
 */
// var server = http.createServer(function (req, res) {
//     if (req.url != '/favicon.ico') {
//         var readableStream = fs.createReadStream(__dirname + '/data.txt', {highWaterMark: 11});
//         var writableStream = fs.createWriteStream(__dirname + '/file.txt');
//         var data = '';

//         readableStream.on('data', function (chunk) {
//             data += chunk;
//         });
//         readableStream.on('end', function () {
//             res.write(data);
//             res.end();
//         });
//     }
// });
// server.listen(8000);

/*
 * 避免乱码的方式是先用数组保存所有的chunk
 * 然后用Buffer.concat方法拼接chunk
 */
var server = http.createServer(function (req, res) {
    if (req.url != '/favicon.ico') {
        var readableStream = fs.createReadStream(__dirname + '/data.txt', {highWaterMark: 11});
        var writableStream = fs.createWriteStream(__dirname + '/file.txt');
        var data = [];

        readableStream.on('data', function (chunk) {
            data.push(chunk);
        });
        readableStream.on('end', function () {
            data = Buffer.concat(data);
            res.write(data);
            res.end();
        });
    }
});
server.listen(8000);