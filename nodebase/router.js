var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;

function route(handle, pathname, response) {

	var realPath = "asset" + pathname;
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'unknown';

	// response.writeHead(200, {"Content-Type": "text/plain"});
	// response.write(realPath);
	// response.end();

	if(mime[ext]){
		var contentType = mime[ext] || "text/plain";

	    path.exists(realPath, function (exists) {
	        if (!exists) {
	            response.writeHead(404, {
	                'Content-Type': 'text/plain'
	            });

	            response.write("This request URL " + pathname + " was not found on this server.");
	            response.end();
	        } else {
	            fs.readFile(realPath, "binary", function (err, file) {
	                if (err) {
	                    response.writeHead(500, {
	                        'Content-Type': 'text/plain'
	                    });

	                    response.end(err);
	                } else {
	                    response.writeHead(200, {
	                        'Content-Type': contentType
	                    });

	                    response.write(file, "binary");

	                    response.end();
	                }
	            });
	        }
	    });
    } else if (typeof handle[pathname] === 'function') {
		handle[pathname](response);
	} else {
    	response.writeHead(404, {"Content-Type": "text/plain"});
    	response.write("404 Not found");
    	response.end();
	}
}

exports.route = route;