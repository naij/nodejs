function start(response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("Hello start");
  	response.end();
}

function upload(response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("Hello Upload");
  	response.end();
}

function ajax(response){
	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("Hello ajax");
  	response.end();
}

var handle = {}
handle["/"] = start;
handle["/start"] = start;
handle["/upload"] = upload;
handle["/ajax"] = ajax;

exports.handle = handle;