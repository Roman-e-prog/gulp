const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.prod.js');
const env = require('gulp-env');

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
