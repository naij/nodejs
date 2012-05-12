var formidable = require('formidable');
var fs = require("fs");

function start(request,response){
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(request,response){
    console.log("Request handler 'upload' was called.");

    var imgserver = 'http://img.server.com:9000/';
    var imgserverDir = 'G:/server/imgserver/';
    var filename = new Date().getTime();

    var form = new formidable.IncomingForm();
    form.uploadDir = imgserverDir;
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, imgserverDir + filename + "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write('<img src="' + imgserver + filename + 'test.png" />');
        response.end();
    });
}

exports.start = start;
exports.upload = upload;