var build = require('./build-utils').build;
var react = require('gulp-react');
var lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var gulp = require('gulp');

var js_initial_pipes = {
  js: null,
  jsx: lazypipe().pipe(react),
}

var css_initial_pipes = {
  css: null,
}

var js_middle_pipes = lazypipe().pipe(function() {return gulpif(is_uncompressed, uglify());})


gulp.task('build_styles', build('css', css_initial_pipes));

gulp.task('build_scripts', build('js', js_initial_pipes, js_middle_pipes));



gulp.task('build', ['build_styles', 'build_scripts']);

gulp.task('default', ['build']);


function is_uncompressed(file) {
  return file.path.indexOf('.min.') < 0;
}
