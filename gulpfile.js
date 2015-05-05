var meta = require('./package.json');
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var argv = require('yargs').argv;
var eslint = require('gulp-eslint');
var jest = require('gulp-jest');
var cache = require('gulp-cached');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var coveralls = require('gulp-coveralls');
var source = require('vinyl-source-stream');

var onError = function(err) {
  gutil.beep();
  return err;
};

// Compile JS using Browserify.
function compileScripts() {
  function bundle(bro, opts) {
    var dest = opts ? './dev' : './src';
    return bro.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(dest));
  }
  var b = browserify({
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: false
  });
  if (argv.watch) {
    // If watch is enabled, wrap this bundle inside watchify.
    b = watchify(b);
    b.on('update', function(ids){
      ids.forEach(function(id){
        gutil.log(id + ' changed.');
      });
      gulp.start('lint');
      // Once for /dev
      bundle(b, {dev: true});
      // Again for /dist
      bundle(b);
    });
    b.on('log', function(msg){
      gutil.log('Browserify: ' + msg);
    });
  }
  b.add('./src/js/app.jsx');
  // Once for /dev
  bundle(b, {dev: true});
  // Again for /dist
  return bundle(b);
}

gulp.task('lint', function() {
  return gulp.src(['./src/js/**/*.jsx', './src/js/**/*.js', './src/js/**/**/*.js', './gulpfile.js', '!./src/js/bundle.js', '!**/coverage/**/*'])
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

gulp.task('coverage', ['jest'], function() {
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('copy-src-files-to-dev', function() {
  return gulp.src('./src/**/*')
    .pipe(gulp.dest('./dev/'))
});

gulp.task('browserify', function(cb) {
  return compileScripts();
});

gulp.task('empty-dist-dir', function(cb) {
  rimraf('./dist', cb);
});

gulp.task('styles', function() {
  return gulp.src(['./src/**/*', '!./src/vendor/**/*'])
    .pipe(cache('styles'))
    .pipe(gulp.dest('./dev/'))
});

gulp.task('process-everything', ['browserify', 'empty-dist-dir'], function(cb) {
  // Copy all the src files over to /dev.
  gulp.start('copy-src-files-to-dev');
  // While that's happening, use usemin to process and optimize all assets and
  // dump them into /dist.
  var usem = gulp.src('./src/index.html')
        .pipe(usemin({
          less: [less(), minifyCss(), 'concat', rev()],
          js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
  // After usemin is done, delete the original bundle.js
  usem.on('end', function(){
    rimraf('./src/bundle.js', cb);
  });
});

// Primary task
gulp.task('build', function() {
  if (argv.watch) {
    gulp.watch(['./src/**/*.html', './src/less/**/*.less'], ['styles']);
    gulp.watch(['./src/**/__tests__/**/*.js'], ['test']);
  }
  return gulp.start(['process-everything']);
});

gulp.task('test', ['lint', 'jest']);
gulp.task('default', ['test', 'build']);
