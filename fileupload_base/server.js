var http = require('http'),
sys = require('sys'),
fs = require('fs');
 
var server = http.createServer();
console.log("Starting up the server");
server.listen(8000);
 
server.on('request', function(request, response) {
  var file = fs.createWriteStream('1.jpg');
  // var fileSize = request.headers['content-length'];
  // var uploadedSize = 0;
 
  // request.on('data', function (chunk) {
  //   uploadedSize += chunk.length;
  //   uploadProgress = (uploadedSize/fileSize) * 100;
  //   response.write(Math.round(uploadProgress) + "%" + " uploaded\n" );
  //   var bufferStore = file.write(chunk);
  //   if(bufferStore == false)
  //     request.pause();
  // });
 
  // file.on('drain', function() {
  //   request.resume();
  // })
 
  // request.on('end', function() {
  //   response.write('Upload done!');
  //   response.end();
  // })

    request.pipe(file);
});