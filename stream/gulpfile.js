var gulp  = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var combine = require('./tasks/combine');

gulp.task('build', function() {
    gulp.src('./files/views/**/*.js')
        .pipe(combine)
        .pipe(uglify({
            output:{ascii_only:true}
        }))
        .pipe(gulp.dest('./build/'))
});