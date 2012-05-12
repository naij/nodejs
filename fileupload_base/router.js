
function route(req,res,pathname,handler){
    if(typeof handler[pathname] === 'function'){
        handler[pathname](req,res);
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("404 Not found");
        res.end();
    }
}

exports.route = route;