
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

app.get('/user/:id/:operation?', function(req, res, next){
    var id = req.params.id;
    if (id) {
        res.send(id);
    } 
});

app.get('/user', function(req, res){
    res.send('users');
});

app.get('/test.html', function (req, res) {
	res.sendfile(__dirname + '/test.html');
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
         	res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes' + 'username' + req.body.username);
      	});
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
