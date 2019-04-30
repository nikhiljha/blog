const gulp  = require('gulp');

/**
  Our gulp tasks live in their own files,
  for the sake of clarity.
 */
require('require-dir')('./gulp-tasks');

gulp.task("watch", function() {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});

gulp.task('build', gulp.parallel(
  'css',
  'js'
));

gulp.task('dev', gulp.series(
  'build',
  'watch'
));
