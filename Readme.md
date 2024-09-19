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

for tests with jest-cli example
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


docker exec -it gulp-backend-1 bash
cat /var/lib/postgresql/data/pg_hba.conf

docker exec -it gulp-postgres-1 bash
psql -U postgres
ALTER USER postgres WITH PASSWORD 'HOBBES14pebbles13_1a';

 # - name: Install PostgreSQL Client
    #   run: apt-get update && apt-get install -y postgresql-client

    # - name: Wait for PostgreSQL to be ready
    #   run: |
    #       echo "Waiting for PostgreSQL to be ready..."
    #       sleep 60  # Add a sleep command to give PostgreSQL extra time
    #       until pg_isready -h postgres -d $${POSTGRES_DB} -U $${POSTGRES_USER}; do
    #         echo "Waiting for PostgreSQL..."
    #         sleep 30  # Increase the wait time between checks
    #       done

    # - name: Run Gulp build
    #   env:
    #       DB_USER: ${{ secrets.DB_USER }}
    #       DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    #       DB_HOST: postgres
    #       DB_NAME: ${{ secrets.DB_NAME }}
    #       PORT: 5432
    #       SERVER_PORT: 5000
    #   run: |
    #        npx gulp frontend-build
    #        npx gulp backend-build


    Playwright
    installed the extension
    in the control panel entered playwright and chosen "test: intall playwright" It installs me following files in the root:
    tests
    tests-examples
    playwright.config.ts //typescript is default otherwise I must choose js in the prompt.
    in .github/workflows I get a playwright.yml

    In the console I get this options:
    Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - .\playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭

When I click on the test icon in the sidebar it opens me a playwright section at the bottom,
with different options that I can choose.


So an additional possibility is npx playwright show-report //there I get an ip adress to an ui with more information
also I can run npx playwright test --trace on and then again npx playwright show-report, the same happens only that I have a button that leads to the trace, what is helpful to see all staages my test have done and get detailed informations

When I let the tests run in the show browsers mode it takes my default the first browser enabled in the playwright.config. THe is an arrow in the top of the test bar in vs-code I can click on and choose the browsers that should be openend and it opens then the tested page in all this browsers

I can run a debug on a special test and line by npx playwright testfile.spec.ts: 10 --debug, debug opens the inspector and by defining the specFile and line it goes directl there.

I can press newRecord, then it opens me a new testfile with ...recording, I can coose one or more browser, then open my project in another terminal, when I the navigate to this browser window, the test automatically set this url in page.goto and I can then click on the elements on the page and it writes me then the tests for that. I have then only to rename the testfile.

Multiple Projects that depends on each other

In the projects section of the playwright.config, I can define several projects by using objects.
They need a name and a testMacht. But I can also define dependencies in an array and they are a depends_on, so when there are several projects I can tell on which other project this would depends. Also I can tell there in a use object: storageState: STORGE_STATE and then define this env variable at the top with a path.
After this I can create a test file with the testMatch of the project that should run first, I can then set in the import of test an as <projectname>, so that I have a nicer structure. 
I import then this STORAGE_STATE variable from the playwright.config and set at the bottom of this testFile an await page.context().storageState({path:STORAGE_STATE})
I also have then have to create a testfile that fits to the testMatch of the project that should run after this first project.
Also I can copy one of the ...devices directly into this project, so that it defines on which broowser this project should run.
To ignore some projects I also can use testIgnore and set therein the projectname.

with npx playwright test --project=<projectname> I can pick one of the test projects to let it run alone.
Playwright Browsers

I can install the browsers via vs-code when installing Playwright
Sometimes it can go something wrong with installing the browsers via vs-code.
Then playwright might show the error, that the browser cannot be found, or is not installed.
To fix this I can clear the cache
clear vs code cache
Windows: Navigate to C:\Users\<YourUsername>\AppData\Roaming\Code\Cache and
Clear editor and search history 

C:\Users\<YourUsername>\AppData\Roaming\Code\CachedData. Delete the contents of these folders.
and I can remove the ms-playwright folder
and then run npx playwright install

I can wright playwright in similar way to puppeteer using the browser I want to launch, example
const { chromium, firefox, webkit } = require('playwright'); This is the immedeatly invoked function that runs as soon as it is created.

(async () => {
  const browser = await chromium.launch();  // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();
Like puppeteer playwright is completly asynchronous, so that I use everytime an async and then await every step.
Like in puppeteer I can also choose different devices, example:
const { webkit, devices } = require('playwright');
const iPhone = devices['iPhone 6'];

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    ...iPhone
  });
  const page = await context.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();

Browser vs Context
Browser definition:
A browser instance represents the entire web browser application, such as Chrome, Firefox, or Safari.
Context definition:
 A browser context is an isolated environment within a browser instance. It allows to run multiple independent sessions within the same browser.
 Creating a new context is faster and more resource-efficient than launching a new browser instance.

const context = await browser.newContext();
not forget to close:
// Gracefully close up everything
  await context.close();
  await browser.close();

the connection of a browser I can also test with browser.isConnected()

in playwright we must set test infront of commands like beforeEach or describe

fill = type, it fills an input

for debugging is very nice the ui mode npx playwright --ui, in the ui there is a pick locator then gives me the best locator for each element on the page, so that I can copy it into the test. Next to the test I can run view and edit the test directly in vs-code.

example workflow for playwright when running in development modus:

name: Playwright Tests

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: |
          if [ "$NODE_ENV" == "development" ]; then
            npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30


