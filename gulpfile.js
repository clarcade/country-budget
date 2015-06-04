var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower2');
var sass = require('gulp-sass');

gulp.task('clean', function(cb) {
   del([
      'presentations/site/assets/vendor/*'
   ], cb);
});

gulp.task('bower', ['clean'], function() {
   return bower()
      .pipe(gulp.dest('presentations/site/assets/vendor/'))
});

gulp.task('sass', function () {
   gulp.src('./presentations/site/assets/stylesheets/scss/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./presentations/site/assets/stylesheets/css'));
});

gulp.task('sass:watch', function () {
   gulp.watch('./presentations/site/assets/stylesheets/scss/*.scss', ['sass']);
});
