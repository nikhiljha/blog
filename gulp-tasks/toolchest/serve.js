var project = require('./_project.js');
var gulp    = require('gulp');
var serve   = require('gulp-serve');

gulp.task('serve', serve({
  root: [project.buildDest],
  port: 8008,
}));
