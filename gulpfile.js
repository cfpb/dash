var gulp = require('gulp');
var less = require('gulp-less');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
    return gulp.src(['src/js/**/*.jsx', 'src/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('build', function () {
  return gulp.src('src/index.html')
        .pipe(usemin({
          less: [less(), minifyCss(), 'concat', rev()],
          js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);