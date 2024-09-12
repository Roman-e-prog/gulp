const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function scripts() {
  return src('frontend/src/**/*.jsx') // Target all JSX files in the frontend/src directory
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }))
    .pipe(uglify())
    .pipe(dest('frontend/build/js')); // Output the compiled and minified JS to the dist/js directory
}

module.exports = scripts;
