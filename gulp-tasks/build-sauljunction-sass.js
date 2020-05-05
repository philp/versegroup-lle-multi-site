/*
 * Compile the sass + autoprefix + pixrem + livereload
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
// var autoprefixer = require('gulp-autoprefixer');
// var cleanCSS = require('gulp-clean-css');

var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 8',
    'ff >= 20',
    'ios 6',
    'android 4'
];

module.exports = function () {
    return gulp.src(global.paths.src.sauljunctionsass.site)
        .pipe(plumber())
        .pipe(sass({ style: 'expanded' }))
        .on('error', swallowError)
        // .pipe(autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'Opera 12.1', 'Android 4'))
        // .on('error', swallowError)
        // .pipe(cleanCSS())
        .pipe(cssnano({
            autoprefixer: {
                browsers: supported,
                add: true
            },
            zindex:false,
            discardComments: {
                removeAll: true,
            }
        }))
        .on('error', swallowError)
        .pipe(gulp.dest(global.paths.dest.sauljunction));
};

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());
  if(error.codeFrame) {
      console.log(error.codeFrame);
  }

  this.emit('end');
}
