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
var rimraf = require('gulp-rimraf');
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

var compileScripts = function() {
  var bundler, rebundle;
  bundler = browserify({
    basedir: __dirname,
    debug: argv.dev || argv.watch,
    entries: './src/js/app.jsx',
    cache: {},
    packageCache: {},
    fullPaths: argv.dev || argv.watch
  });
  if (argv.watch) {
    bundler = watchify(bundler);
  }
  bundler.transform(reactify);
  rebundle = function() {
    var stream = bundler.bundle();
    stream = stream.pipe(source('bundle.js'));
    // Lint whenever a source JS file changes, change this to 'test' if you also
    // want Jest to run.
    if (argv.watch) {
      gulp.start('lint');
    }
    return stream.pipe(gulp.dest('./dist'));
  };
  bundler.on('update', rebundle);
  bundler.on('log', function(msg){
    gutil.log('Browserify: ' + msg);
  });
  return rebundle();
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

gulp.task('clean', function() {
  return gulp.src('./dist', {read: false})
    .pipe(rimraf());
});

gulp.task('bundle', function() {
  return compileScripts();
});

gulp.task('watch-less', function() {
  gwatch(['./src/**/*.html', './src/less/**/*.less'], function() {
    gulp.start('copy-src');
  });
});

gulp.task('watch-tests', function() {
  gwatch(['./src/**/__tests__/**/*.js'], function() {
    gulp.start('test');
  });
});

gulp.task('copy-src', function() {
  return gulp.src('./src/**/*')
    .pipe(cache('move'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('build', ['clean', 'bundle'], function() {
  if (argv.watch) {
    gulp.start(['watch-less', 'watch-tests']);
  }
  if (argv.dev) {
    return gulp.start('copy-src');
  }
  return gulp.src('./src/index.html')
    .pipe(cache('usemin'))
    .pipe(usemin({
      less: [less(), minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('test', ['lint', 'jest']);
gulp.task('default', ['test', 'build']);
