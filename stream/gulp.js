var gulp  = require('gulp');

// gulp.src('./data.txt', {buffer: false}).on('data', function(file) {
//     var stream = file.contents;
//     stream.on('data', function(chunk) {
//         console.log('Read %d bytes of data', chunk.length);
//     });
// });

// gulp.src('./data.txt', {buffer: false}).on('data', function(file) {
//     var stream = file.contents;
//     stream.on('data', function(chunk) {
//         console.log(chunk);
//     });
// });

gulp.src('./data.txt').on('data', function(file) {
    // var stream = file.contents;
    // console.log(file);
});