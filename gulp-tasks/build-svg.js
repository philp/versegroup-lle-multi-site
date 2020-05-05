// gulpfile.js
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sassInlineSvg = require('gulp-sass-inline-svg');
var svgmin = require('gulp-svgmin');

module.exports = function () {
    return gulp.src(global.paths.src.svg.site)
       	.pipe(plumber())
      .pipe(svgmin()) // Recommend using svg min to optimize svg files first
      .on('error', swallowError)
      .pipe(sassInlineSvg({
        destDir: global.paths.src.svg.sass
      })
      .on('error', swallowError)
  );
};

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString());
  if(error.codeFrame) {
      console.log(error.codeFrame);
  }
  this.emit('end');
}
