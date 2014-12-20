var http = require('http');
var fs = require('fs');
var oppressor = require('oppressor');

// var server = http.createServer(function (req, res) {
//     if (req.url != '/favicon.ico') {
//         var stream = fs.createReadStream(__dirname + '/data.txt');
//         stream.pipe(res);
//     }
// });
// server.listen(8000);



var readableStream = fs.createReadStream(__dirname + '/data.txt');
var writableStream = fs.createWriteStream(__dirname + '/file.txt');

readableStream.setEncoding();
readableStream.on('data', function (chunk) {
    readableStream.pause();

    setTimeout(function() {
        console.log('现在数据会再次开始流动');
        readableStream.resume();
    }, 100);
});
readableStream.on('end', function () {
    console.log('读取完毕');
});

// readableStream.on('readable', function () {
//     var chunk;
//     while (null !== (chunk = readableStream.read())) {
//         console.log('得到了 %d 字节的数据', chunk.length);
//     }
// });

// readableStream.pipe(writableStream);

// setTimeout(function() {
//     console.log('停止写入到 file.txt');
//     readableStream.unpipe(writableStream);
//     console.log('自行关闭文件流');
//     writableStream.end();
// }, 10);