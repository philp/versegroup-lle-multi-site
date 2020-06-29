/*
 * Concat the site javascript and livereload
 */

require('babel-polyfill');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var babel = require('gulp-babel');

module.exports = function () {

    return gulp.src(global.paths.src.js.critical)
    	.pipe(plumber())
        .pipe(concat('critical.js'))
        .on('error', swallowError)
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', swallowError)
        .pipe(minify({
        	noSource:0
        }))
        .on('error', swallowError)
        .pipe(gulp.dest(global.paths.dest.js))
};

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());
  if(error.codeFrame) {
      console.log(error.codeFrame);
  }
  this.emit('end');
}
