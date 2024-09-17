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
const { exec } = require('child_process');
dotenv.config();
gulp.task('log', function(done) {
	console.log('Gulp is running');
	done();
});
gulp.task('clean', () => {
	console.log('Running clean task');
	return gulp.src('frontend/build', { allowEmpty: true })
		.pipe(clean());
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
gulp.task('test:playwright', (done) => {
	console.log('running playwright tests')
	exec('npx playwright test', (err, stdout, stderr) => {
	  console.log(stdout);
	  console.error(stderr);
	  done(err);
	});
  });
gulp.task('nodemon', function(done) {
	nodemon({
	  script: 'backend/index.js',
	  ext: 'js',
	  env: { 'NODE_ENV': 'production', 'DB_USER': 'postgres' , 'DB_HOST': 'postgres' }, 
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


// gulp.task('all-js', function () {
//     return gulp.src(['./*.js', '!./node_modules/**', '!./gulpfile.js'])
//         .pipe(gulp.dest('dist/'));
// });
// gulp.task('lint', () => {
//     return gulp.src('dist/js/**/*.js') 
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// });

gulp.task('watch', function() {
	gulp.watch('frontend/src/**/*.scss', gulp.series('styles'));
	gulp.watch('frontend/src/**/*.jsx', gulp.series('scripts'));
	gulp.watch('backend/**/*.js', gulp.series('backendscripts'));
	// gulp.watch(['./*.js', '!./node_modules/**', '!./gulpfile.js'], gulp.series('all-js'));
});

gulp.task('frontend-build', gulp.series('log', 'clean', 'styles', 'scripts', 'webpack','update-import-paths', 'move-html', 'test', 'test:playwright'));
gulp.task('backend-build', gulp.series('log', 'backendscripts', 'nodemon'));
gulp.task('default', gulp.series('frontend-build', 'backend-build', 'watch'));
		