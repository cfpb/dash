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
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');

var onError = function(err) {
  gutil.beep();
  return err;
};

gulp.task('lint', function() {
  return gulp.src(['./src/js/**/*.jsx', './src/js/**/*.js', './gulpfile.js', '!./src/js/bundle.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(eslint.failOnError());
});

gulp.task('jest', function() {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: onError
    }))
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

gulp.task('build', ['clean', 'bundle'], function() {
  return gulp.src('./src/index.html')
    .pipe(cache('usemin'))
    .pipe(usemin({
      less: [less(), minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('deploy', ['bundle'], function() {
  return gulp.src('./src/**/*')
    .pipe(cache('move'))
    .pipe(gulp.dest('../devdash/devdash/static'))
    .pipe(filter('index.html'))
    .pipe(rename('dash.html'))
    .pipe(gulp.dest('../devdash/devdash/static'))
});

gulp.task('watch', function() {
  gulp.watch(['gulpfile.js', './src/js/**/*.jsx', './src/js/**/*.js', './src/less/**/*.less'], ['deploy', 'test']);
});

gulp.task('test', ['lint', 'jest']);
gulp.task('default', ['test', 'build']);
