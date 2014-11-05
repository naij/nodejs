var fs = require('fs');

var writableStream = fs.createWriteStream(__dirname + '/file.txt');

var j = 0;
function writeOneMillionTimes(writer, data, encoding, callback) {
    var i = 100000;

    write();

    function write() {
        var ok = true;

        j++;

        do {
            i -= 1;
            if (i === 0) {
                // 最后一次！
                writer.write(data, encoding, callback);
            } else {
                // 检查我们应该继续还是等待
                // 不要传递回调，因为我们还没完成。
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            // 不得不提前停止！
            // 一旦它排空，继续写入数据
            writer.once('drain', write);
        }
    }
}

writeOneMillionTimes(writableStream, '1', 'utf-8', function () {
    console.log('finished %d', j);
});