var express = require('express');
var fs = require('fs')
var jade = require('jade');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(path.join(__dirname, 'public')));

// Routes
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/file-upload', function(req, res) {
    var file = fs.createWriteStream("1.jpg");

    req.on('data', function (data) {
        file.write(data);
    });
    req.on('end', function() {
        file.end();
        file.on('finish', function() {
          res.redirect('/');
        });
    });
    // // 获得文件的临时路径
    // var tmp_path = req.files.video.path;
    // // 指定文件上传后的目录 - 示例为"images"目录。 
    // var target_path = './public/images/' + req.files.video.name;
    // // 移动文件
    // fs.rename(tmp_path, target_path, function(err) {
    //     if (err) throw err;
    //     // 删除临时文件夹文件, 
    //     fs.unlink(tmp_path, function() {
    //         if (err) throw err;
    //         res.render('index', {msg: 'File uploaded to: ' + target_path + ' - ' + req.files.video.size + ' bytes'});
    //     });
    // });
});

app.listen(app.get('port'));