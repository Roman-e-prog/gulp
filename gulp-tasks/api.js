const gulp = require('gulp');
const uglify = require('gulp-uglify');


function backendScripts() {
  return gulp.src('backend/**/*.js') // Target all JS files in the backend/src directory
    .pipe(uglify()) // Minify the JS files
    .pipe(gulp.dest('dist/js')); // Output the minified JS to the dist/js directory
}

module.exports = backendScripts;
