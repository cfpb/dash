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
  function bundle(bro) {
    return bro.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./src'));
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
      bundle(b);
    });
    b.on('log', function(msg){
      gutil.log('Browserify: ' + msg);
      gulp.start('lint');
    });
  }
  b.add('./src/js/app.jsx');
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

gulp.task('browserify', function() {
  return compileScripts();
});

gulp.task('empty-dist-dir', function(cb) {
  rimraf('./dist', cb);
});

gulp.task('process-for-prod', function(cb) {
  var usem = gulp.src('./src/index.html')
        .pipe(usemin({
          less: [less(), minifyCss(), 'concat', rev()],
          js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Primary task
gulp.task('build', ['browserify', 'empty-dist-dir'], function() {
  if (argv.watch) {
    gulp.watch(['./src/**/__tests__/**/*.js'], ['test']);
  }
  gulp.start('process-for-prod');
});

gulp.task('test', ['lint', 'jest']);
gulp.task('default', ['test', 'build']);
