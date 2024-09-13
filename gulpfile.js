const gulp = require('gulp');
const clean = require('gulp-clean');
const styles = require('./gulp-tasks/styles');
const scripts = require('./gulp-tasks/scripts');
const jest = require('gulp-jest').default;
const env = require('gulp-env');
const nodemon = require('gulp-nodemon');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const eslint = require('gulp-eslint');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack/webpack.common.js');
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const dotenv = require('dotenv');
const backendscripts = require('./gulp-tasks/backendscripts');
dotenv.config();

gulp.task('log', function(done) {
    console.log('Gulp is running');
    done();
});

gulp.task('backendscripts', backendscripts);
gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('update-import-paths', () => {
    console.log('Running update-import-paths task');
    return gulp.src('frontend/build/js/**/*.js')
      .pipe(replace(/\.scss/g, '.css'))
      .pipe(gulp.dest('frontend/build/js'))
      .on('data', (file) => {
          console.log(`Processed file: ${file.path}`);
      });
});

gulp.task('move-html', function() {
    return gulp.src('frontend/public/*.html')
      .pipe(useref())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('frontend/build/'));
});

gulp.task('test', () => {
    console.log('Running test task');
    return gulp.src(['frontend/src/**/*.test.js'], { allowEmpty: true })
        .pipe(jest({
            "preprocessorIgnorePatterns": [
                "<rootDir>/frontend/build", "<rootDir>/frontend/node_modules/"
            ],
            "automock": false
        }));
});

gulp.task('nodemon', function(done) {
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    console.log('DB_HOST:', process.env.DB_HOST);
    nodemon({
      script: 'backend/index.js',
      ext: 'js',
      env: { 'NODE_ENV': 'production', 'DB_PASSWORD': process.env.DATABASE_PASSWORD, 'DB_USER': process.env.DB_USER, 'DB_HOST': process.env.DB_HOST }, 
      done: done
    });
});

gulp.task('webpack', async function (done) {
    const debug = (await import('gulp-debug')).default;
    return gulp.src('frontend/src/index.jsx')
        .pipe(webpackStream(webpackConfig))
        .pipe(debug({title: 'Processing:'}))
        .pipe(gulp.dest('frontend/build/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch('frontend/src/**/*.scss', gulp.series('styles'));
    gulp.watch('frontend/src/**/*.jsx', gulp.series('scripts'));
    gulp.watch('backend/**/*.js', gulp.series('backendscripts'));
});

gulp.task('frontend-build', gulp.series('styles', 'scripts', 'webpack', 'update-import-paths', 'move-html', 'test'));
gulp.task('backend-build', gulp.series('log', 'backendscripts', 'nodemon'));

gulp.task('default', gulp.series('frontend-build', 'backend-build', 'watch'));
