var gulp = require('gulp');
var del = require('del');
var bower = require('gulp-bower2');

gulp.task('clean', function(cb) {
   del([
      'presentations/site/assets/*'
   ], cb);
});

gulp.task('bower', ['clean'], function() {
   return bower()
      .pipe(gulp.dest('presentations/site/assets/'))
});
