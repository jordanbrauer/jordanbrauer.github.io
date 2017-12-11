// gulp plugins
const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const sass = require('gulp-sass');
const imgMin = require('gulp-imagemin');
const imgResize = require('gulp-image-resize');

// cleaners
gulp.task('clean:scripts', () => del('./assets/scripts/**/*.js'));
gulp.task('clean:styles', () => del('./assets/styles/**/*.css'));
gulp.task('clean:images', () => del('./assets/images/**/*.{png, ,jpg, jpeg}'));

// concat scripts tasks
gulp.task('concat:scripts', ['clean:scripts'], () => {
  const stream = gulp.src([
    './scripts/jquery.min.js',
    './scripts/foundation.min.js'
  ]).pipe(concat('app.min.js'))
    .pipe(gulp.dest('./assets/scripts'));

  return stream;
});

// compile expanded sass task
gulp.task('expand:sass', ['clean:styles'], () => {
  const stream = gulp.src('./styles/app.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/styles'));

  return stream;
});

// compile mini sass task
gulp.task('minify:sass', ['clean:styles'], () => {
  const stream = gulp.src('./styles/app.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename(path => path.basename += '.min'))
    .pipe(gulp.dest('./assets/styles'));

  return stream;
});

// resize images task
gulp.task('resize:images', ['clean:images'], () => {
  const stream = gulp.src('./images/**/*.png')
    .pipe(imgResize({
      imageMagick: true,
      width: 528,
      height: 528,
      crop: false,
      upscale: false,
      quality: 1
    }))
    .pipe(rename((path) => path.basename += '.min'))
    .pipe(gulp.dest('./assets/images'));

  return stream;
});

// minify images task
gulp.task('minify:images', ['resize:images'], () => {
  const stream = gulp.src([
    './assets/images/**/*.png',
    './images/**/*.png'
  ]).pipe(imgMin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./assets/images'))

  return stream;
});

// batch tasks
gulp.task('clean', ['clean:scripts', 'clean:styles', 'clean:images']);
gulp.task('scripts', ['clean:scripts', 'concat:scripts']);
gulp.task('styles', ['clean:styles', 'expand:sass', 'minify:sass']);
gulp.task('images', ['clean:images', 'resize:images', 'minify:images']);

gulp.task('build', ['clean', 'scripts', 'styles', 'images']);

// watch tasks
gulp.task('watch:styles', () => gulp.watch('./styles/**/*.*', ['styles']));
gulp.task('watch:scripts', () => gulp.watch('./scripts/**/*.*', ['scripts']));

gulp.task('watch', () => gulp.watch(['./scripts/**/*.*', './styles/**/*.*', './images/**/*.*'], ['scripts', 'styles']));

// default task
gulp.task('default', () => console.log('Gulp is working :) ...'));
