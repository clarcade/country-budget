var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower2');
var sass = require('gulp-sass');

gulp.task('clean', function (cb) {
  del([
    'public/assets/vendor/*'
  ], cb);
});

gulp.task('bower', ['clean'], function () {
  return bower()
    .pipe(gulp.dest('public/assets/vendor/'))
});

gulp.task('sass', function () {
  gulp.src('./public/assets/stylesheets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/stylesheets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/assets/stylesheets/scss/*.scss', ['sass']);
});
