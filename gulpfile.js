var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower2');
var sass = require('gulp-sass');

gulp.task('clean', function (cb) {
  del([
    'assets/vendor/*'
  ], cb);
});

gulp.task('bower', ['clean'], function () {
  return bower()
    .pipe(gulp.dest('assets/vendor/'))
});

gulp.task('sass', function () {
  gulp.src('./assets/stylesheets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/stylesheets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/stylesheets/scss/*.scss', ['sass']);
});
