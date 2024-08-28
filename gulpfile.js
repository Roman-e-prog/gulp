const gulp = require('gulp');
const styles = require('./gulp-tasks/styles');
const scripts = require('./gulp-tasks/scripts');
const backendScripts = require('./gulp-tasks/api');
const jest = require('gulp-jest').default;

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('backendScripts', backendScripts);
const env = require('gulp-env');
const webpack = require('webpack');
const webpackConfig = require('./frontend/webpack/webpack.prod.js');
gulp.task('test', () => {
  return gulp.src(['frontend/src/**/*.test.js'], { allowEmpty: true })
      .pipe(jest({
          "preprocessorIgnorePatterns": [
              "<rootDir>/dist/", "<rootDir>/node_modules/"
          ],
          "automock": false
      }));
});
gulp.task('set-prod-node-env', (done) => {
  env({
      vars: {
          NODE_ENV: 'production'
      }
  });
  done();
});

gulp.task('webpack', (done) => {
  webpack(webpackConfig, (err, stats) => {
      if (err) {
          console.log('Webpack', err);
      }
      console.log(stats.toString());
      done();
  });
});

gulp.task('watch', function() {
    gulp.watch('../frontend/src/**/*.scss', gulp.series('styles'));
    gulp.watch('../frontend/src/**/*.jsx', gulp.series('scripts'));
    gulp.watch('../backend/**/*.js', gulp.series('backendScripts'));
});

// gulp.task('default', gulp.series('styles', 'scripts', 'backendScripts', 'watch'));
gulp.task('build', gulp.series('set-prod-node-env', 'styles', 'scripts', 'backendScripts', 'webpack'));
gulp.task('default', gulp.series('build', 'watch'));
