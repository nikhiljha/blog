var project = require('./_project.js');
var gulp    = require('gulp');

gulp.task("watch", function () {
  gulp.watch(project.buildSrc + "/js/**/*", gulp.parallel('scripts'));
  gulp.watch(project.buildSrc + "/scss/**/*", gulp.parallel('styles'));
  gulp.watch(project.buildSrc + "/site/**/*",  gulp.parallel('generate'));
});
