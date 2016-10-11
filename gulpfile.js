// gulpfile.js

/** Dependencies ================================
 */
var gulp = require('gulp');

/** Variables ===================================
 */

/** Gulp Tasks ==================================
 */

// fetch foundation sites sass
gulp.task('foundation-sites:sass', function() {
  return gulp.src('./node_modules/foundation-sites/scss/**/*')
    .pipe(gulp.dest('./_sass/foundation'));
});

// fetch foundation sites js
gulp.task('foundation-sites:js', function() {
  return gulp.src('./node_modules/foundation-sites/dist/foundation.min.js')
    .pipe(gulp.dest('./js/vendor'));
});

// fetch foundation sites vendor js
gulp.task('foundation-sites:vendor-js', function() {
  return gulp.src([
    './node_modules/foundation-sites/vendor/jquery/dist/jquery.min.js',
    './node_modules/foundation-sites/vendor/jquery/dist/jquery.min.map'
  ])
    .pipe(gulp.dest('./js/vendor'));
});

// fetch font awesome fonts
gulp.task('font-awesome:fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('./fonts/font-awesome'));
});

// fetch font awesome sass
gulp.task('font-awesome:sass', function() {
  return gulp.src('./node_modules/font-awesome/scss/*.*')
    .pipe(gulp.dest('./_sass/font-awesome'));
});

// default task
gulp.task('default', function() {
  // ... ... ...
});
