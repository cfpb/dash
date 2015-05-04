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
var gwatch = require('gulp-watch');
var jest = require('gulp-jest');
var cache = require('gulp-cached');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var coveralls = require('gulp-coveralls');
var source = require('vinyl-source-stream');

var PROD = false;

var onError = function(err) {
  gutil.beep();
  return err;
};

function compileScripts(prod) {
  function bundle(bro) {
    var dest = PROD ? './src' : './dist';
    return bro.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(dest));
  }
  var b = browserify({
    debug: argv.dev || argv.watch,
    cache: {},
    packageCache: {},
    fullPaths: argv.dev || argv.watch
  });
  if (argv.watch) {
    // If watch is enabled, wrap this bundle inside watchify.
    b = watchify(b);
    b.on('update', function(){
      gulp.start('lint');
      bundle(b);
    });
    b.on('log', function(msg){
      gutil.log('Browserify: ' + msg);
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

gulp.task('copy-src-files', ['browserify'], function() {
  return gulp.src('./src/**/*')
    .pipe(cache('move'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('browserify', ['empty-dist-dir'], function() {
  return compileScripts();
});

gulp.task('empty-dist-dir', function(cb) {
  rimraf('./dist', cb);
});

gulp.task('styles', function() {
  return gulp.src(['./src/**/*', '!./src/vendor/**/*'])
    .pipe(cache('styles'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('process-everything', ['browserify'], function(cb) {
  var u = gulp.src('./src/index.html')
        .pipe(usemin({
          less: [less(), minifyCss(), 'concat', rev()],
          js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));

  u.on('end', function(){
    rimraf('./src/bundle.js', cb);
  });

});

// Primary task
gulp.task('build', function() {
  if (argv.watch) {
    gulp.watch(['./src/**/*.html', './src/less/**/*.less'], ['styles']);
    gulp.watch(['./src/**/__tests__/**/*.js'], ['test']);
  }
  if (argv.dev || argv.watch) {
    return gulp.start(['copy-src-files']);
  } else {
    PROD = true;
    return gulp.start(['process-everything']);
  }
});

gulp.task('test', ['lint', 'jest']);
gulp.task('default', ['test', 'build']);
