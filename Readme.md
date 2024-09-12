Gulp
With Gulp we create a build pipeline, that minifies the code and automate other steps of development.
From the net
Gulp is a task runner that uses Node.js as a platform. It purely uses the JavaScript code and helps to run front-end tasks and large-scale web applications. Gulp builds system automated tasks like CSS and HTML minification, concatenating library files, and compiling the SASS files

Transpilation
You can write a gulpfile using a language that requires transpilation, like TypeScript or Babel, by changing the extension on your gulpfile.js to indicate the language and install the matching transpiler module.

For TypeScript, rename to gulpfile.ts and install the ts-node module.
For Babel, rename to gulpfile.babel.js and install the @babel/register module.
Most new versions of node support most features that TypeScript or Babel provide, except the import/export syntax. When only that syntax is desired, rename to gulpfile.esm.js and install the esm module.

Gulpfiles execute the tasks written in there.

Node's module resolution allows you to replace your gulpfile.js file with a directory named gulpfile.js that contains an index.js file which is treated as a gulpfile.js. This directory could then contain your individual modules for tasks. If you are using a transpiler, name the folder and file accordingly

To have your tasks execute in order, use the series() method.
parallel() executes the tasks parallel, when one task fails the others are may executed, when a task in a series() fails, the series will stop to be executed.

Typescript
npm install --save-dev typescript gulp gulp-typescript
tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["frontend/src/**/*"]
}
ts-task

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function scripts() {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist/js'));
}

gulp.task('scripts', scripts);

for production build example

const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
Images

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', () => {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});
Example gulpfile for production build
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

// Minify CSS
gulp.task('minify-css', gulp.series('sass', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}));

// Minify JS
gulp.task('minify-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

// Watch Files
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass', 'minify-css'));
  gulp.watch('src/js/**/*.js', gulp.series('minify-js'));
});

// Default Task
gulp.task('default', gulp.series('sass', 'minify-css', 'minify-js', 'watch'));

copy backup to database
docker cp c:\Users\User\OneDrive\Dokumente/todos.sql 4d236342e9ad:/todos.sql
docker exec -it 4d236342e9ad bash
pg_restore -U postgres -d todo_gulp /todos.sql
then refreshb the db

get data from local pgadmin in Docker pgadmin
Connect Docker pgAdmin4 to Local PostgreSQL:
Add your local PostgreSQL server to Docker pgAdmin4:
Open pgAdmin4 in your browser.
Right-click on “Servers” and select “Create” > “Server”.
Enter the connection details for your local PostgreSQL server.

debug
docker-compose exec frontend sh
ls /usr/share/nginx/html

docker-compose exec frontend sh
cat /var/log/nginx/error.log
cat /var/log/nginx/access.log

docker-compose exec frontend sh
nginx -t

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 3970a87b33af

for tests with jest-cli
const gulp = require('gulp');
const jest = require('jest-cli');

async function runTests() {
  const { results } = await jest.runCLI({}, ['dist']);
  if (!results.success) {
    console.log('Tests failed');
    process.exit(1);
  }
}

gulp.task('test', runTests);

gulp.task('build', gulp.series('test', function buildAssets() {
  // Your build tasks here
}));

minify with webpack
// webpack.prod.js
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify('Something')
        }),
    ],
};
example gulpfile:
// gulpfile.js
const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.prod.js');
const minifyJs = require('gulp-minify');

gulp.task('webpack', (done) => {
    webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.error(err);
        }
        done();
    });
});

gulp.task('copy-files', () => {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('build'));
});

gulp.task('minify-js', () => {
    return gulp.src('build/*.js')
        .pipe(minifyJs())
        .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('webpack', 'copy-files', 'minify-js'));


Ablage
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function scripts() {
  return src('src/**/*.jsx') // Target all JSX files in the frontend/src directory
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-syntax-export-default-from',
        '@babel/plugin-proposal-export-default-from',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-class-properties'
      ]
    }))
    .pipe(uglify())
    .pipe(dest('dist/js')); // Output the compiled and minified JS to the dist/js directory
}

module.exports = scripts;

npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-react @pmmmwh/react-refresh-webpack-plugin css-loader html-webpack-plugin node-sass sass-loader style-loader webpack webpack-cli webpack-dev-server webpack-merge




