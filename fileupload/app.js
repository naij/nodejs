
/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
  	routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser({uploadDir:'./uploads'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);


var users = [{ name: 'www.csser.com' }];
app.all('/user/:id/:op?', function(req, res, next){
  	req.user = users[req.params.id];
  	if (req.user) {
    	next();
 	} else {
   		next(new Error('cannot find user ' + req.params.id));
  	}
});

app.get('/user/:id', function(req, res){
  	res.send('viewing ' + req.user.name);
});

app.get('/user/:id/edit', function(req, res){
  	res.send('editing ' + req.user.name);
});

app.put('/user/:id', function(req, res){
  	res.send('updating ' + req.user.name);
});

app.get('*', function(req, res){
  	res.send('what???', 404);
});


app.post('/file-upload', function(req, res) {
	// 获得文件的临时路径
	var tmp_path = req.files.thumbnail.path;
	// 指定文件上传后的目录 - 示例为"images"目录。 
	var target_path = './public/images/' + req.files.thumbnail.name;
	// 移动文件
	fs.rename(tmp_path, target_path, function(err) {
	  	if (err) throw err;
	  	// 删除临时文件夹文件, 
	  	fs.unlink(tmp_path, function() {
	    	if (err) throw err;
	    	res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
	  	});
	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
