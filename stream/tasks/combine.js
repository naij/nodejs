var fs = require('fs');
var Path = require("path");
var util = require('util');
var Transform = require('stream').Transform;
var mtmin = require('./libs/mtmin');
var jsProc = require('./libs/jsproc');
var Converter = require('./libs/unicode');

util.inherits(Combine, Transform);

function Combine(opt) {
    Transform.call(this, opt);
}
Combine.prototype._parsePath = function (path) {
    var extname = Path.extname(path);

    return {
        dirname: Path.dirname(path),
        basename: Path.basename(path, extname),
        extname: extname
    };
}
Combine.prototype._combine = function (js, html) {
    var newViewContent = '';
    var minTempContent = mtmin(html);
    //生成view属性
    newViewContent = jsProc.removeConsoleX(js);
    newViewContent = jsProc.addProp(newViewContent, 'template', minTempContent);
    newViewContent = Converter.chineseToUnicode(newViewContent);
    return newViewContent;
}
Combine.prototype._transform = function (file, encoding, callback) {
    var me = this;
    var jsContent = String(file.contents);
    var parsedPath = me._parsePath(file.relative);
    var htmlPath = Path.join(parsedPath.dirname, parsedPath.basename + '.html');
    htmlPath = Path.join(file.base, htmlPath);

    fs.readFile(htmlPath, function (err, data) {
        var htmlContent = String(data);

        file.contents = new Buffer(me._combine(jsContent, htmlContent));

        me.push(file);
        callback();
    });
}

module.exports = new Combine({objectMode: true});


// function Combine() {
//     var stream = new Transform({objectMode: true});

//     stream._transform = function (file, encoding, callback) {
//         console.log(String(file.contents));

//         callback();
//     }

//     return stream;
// }