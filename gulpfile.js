var meta = require('./package.json');
var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var eslint = require('gulp-eslint');
var jest = require('gulp-jest');
var watch = require('gulp-watch');
var cache = require('gulp-cached');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');

gulp.task('lint', function() {
  return gulp.src(['./src/js/**/*.jsx', './src/js/**/*.js', './gulpfile.js', '!./src/js/bundle.js'])
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(eslint.failOnError());
});

gulp.task('jest', function() {
  return gulp.src('')
    .pipe(jest(meta.jest));
});

gulp.task('clean', function() {
  return gulp.src('./dist', {read: false})
    .pipe(rimraf());
});

gulp.task('bundle', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  return gulp.src('./src/js/app.js')
    .pipe(browserified)
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./src/'));
});

gulp.task('usemin', ['clean', 'bundle'], function() {
  return gulp.src('./src/index.html')
    .pipe(cache('usemin'))
    .pipe(usemin({
      less: [less(), minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('move-app', ['build'], function() {
  return gulp.src('./src/**/*')
    .pipe(cache('move'))
    .pipe(gulp.dest('../devdash/devdash/static'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/js/**/*.jsx', './src/js/**/*.js', './src/less/**/*.less'], ['test', 'move-app']);
});

gulp.task('test', ['lint', 'jest']);
gulp.task('build', ['usemin']);
gulp.task('deploy', ['move-app']);
gulp.task('default', ['test', 'build']);
