const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

function styles() {
  return gulp.src('frontend/src/**/*.scss') // This targets all SCSS files in the frontend/src directory
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify the CSS
    .pipe(gulp.dest('dist/css')); // Output the compiled and minified CSS to the dist/css directory
}

module.exports = styles;
