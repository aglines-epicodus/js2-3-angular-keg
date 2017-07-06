# Javascript week 2 - Two day project: Taproom
## Configuration/dependencies

1. Create a {.gitignore_global} file on the top directory with the following file names to ignore for all OS generated and Modern Javascript files:
  - .DS_Store
  - .DS_Store?
  - .Spotlight-V100
  - .Trashes
  - ehthumbs.db
  - Thumbs.db
  - bower_components/
  - build/
  - node_modules/
  - tmp/
  - temp/
  - .env
  - npm-debug.log
  - app/\*.js
  - app/\*.js.map

2. Run { $ git config --global core.excludesfile ~/.gitignore_global } in the console log.

3. Create project folder with the following files:
  - README.md
  - index.html
  - gulpfile.js
    - main document to run npm and bower packages
  - app folder
    - app.component.ts, app.module.ts, main.ts
    - all other ts components
  - resources folder
      - images, js, styles folders
      - all .js and .scss or .css files respectively in their nested folders
4. initialize project
  - npm init (initializes project for gulp/npm installs)
  - bower init (initializes project for bower installs)

5. Install typescript
  - npm install typescript -g
  - apm install atom-typescript

6. Write gulpfile.js document, requires the following variables and their associated tasks:
  ```Javascript
  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var utilities = require('gulp-util');
  var buildProduction = utilities.env.production;
  var del = require('del');
  var browserSync = require('browser-sync').create();
  var shell = require('gulp-shell');
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');

  var lib = require('bower-files')({
    "overrides":{
      "bootstrap" : {
        "main": [
          "less/bootstrap.less",
          "dist/css/bootstrap.css",
          "dist/js/bootstrap.js"
        ]
      }
    }
  });

  ////////////////////// TYPESCRIPT //////////////////////
  gulp.task('tsClean', function(){
    return del(['app/*.js', 'app/*.js.map']);
  });

  gulp.task('ts', ['tsClean'], shell.task([
    'tsc'
  ]));

  ////////////////////// BOWER //////////////////////
  gulp.task('jsBowerClean', function(){
    return del(['./build/js/vendor.min.js']);
  });

  gulp.task('jsBower', ['jsBowerClean'], function() {
    return gulp.src(lib.ext('js').files)
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build/js'));
  });

  gulp.task('cssBowerClean', function(){
    return del(['./build/css/vendor.css']);
  });

  gulp.task('cssBower', ['cssBowerClean'], function() {
    return gulp.src(lib.ext('css').files)
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest('./build/css'));
  });

  gulp.task('bower', ['jsBower', 'cssBower']);

  ////////////////////// SASS //////////////////////
  gulp.task('sassBuild', function() {
    return gulp.src(['resources/styles/*'])
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/css'));
  });

  ////////////////////// SERVER //////////////////////
  gulp.task('serve', ['build'], function() {
    browserSync.init({
      server: {
        baseDir: "./",
        index: "index.html"
      }
    });
    gulp.watch(['resources/js/*.js'], ['jsBuild']); // vanilla js changes, reload.
    gulp.watch(['*.html'], ['htmlBuild']); // html changes, reload.
    gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']);
    gulp.watch(['app/*.ts'], ['tsBuild']); // typescript files change, compile then reload.
  });

  gulp.task('jsBuild', function(){
    browserSync.reload();
  });

  gulp.task('htmlBuild', function(){
    browserSync.reload();
  });

  gulp.task('cssBuild', ['sassBuild'], function(){
    browserSync.reload();
  });

  gulp.task('tsBuild', ['ts'], function(){
    browserSync.reload();
  });

  ////////////////////// GLOBAL BUILD TASK //////////////////////
  gulp.task('build', ['ts'], function(){
    // we can use the buildProduction environment variable here later.
    gulp.start('bower');
    gulp.start('sassBuild');
  });
```

7. Install gulp packages
  - npm install gulp --save-dev
  - npm install browserify --save-dev
  - npm install gulp-concat --save-dev
  - npm install vinyl-source-stream --save-dev
  - npm install gulp-uglify --save-dev
  - npm install gulp-util --save-dev
  - npm install del --save-dev
  - npm install jshint --save-dev
  - npm install gulp-jshint --save-dev  

8. Install bower packages
  - npm install bower -g
  - npm install bower-files --save-dev
  - npm install browser-sync --save-dev
  - bower install moment --save
  - bower install jquery --save
  - bower install bootstrap --save

9. Install angular packages
  - not needed if included in the package.json file below, load if things break
10. Index html headers and body
```html
<html>
  <head>
    <title>Taproom</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="build/js/vendor.min.js"></script>
    <link rel="stylesheet" href="build/css/vendor.css">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>

    <link rel="stylesheet" href="build/css/styles.css">
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <!-- 3. Display the application -->
  <body>
    <app-root>Loading...</app-root>
  </body>
</html>
```
11. pacakge.json file
```json
{
  "name": "taproom",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
    "lite": "lite-server",
    "postinstall": "typings install",
    "tsc": "tsc",
    "tsc:w": "tsc -w"
  },
  "license": "MIT",
  "dependencies": {
    "@angular/common": "2.4.0",
    "@angular/compiler": "2.4.0",
    "@angular/core": "2.4.0",
    "@angular/forms": "2.4.0",
    "@angular/http": "2.4.0",
    "@angular/platform-browser": "2.4.0",
    "@angular/platform-browser-dynamic": "2.4.0",
    "@angular/router": "3.4.0",
    "@angular/upgrade": "2.4.0",
    "bootstrap": "3.3.6",
    "angular-in-memory-web-api": "0.3.1",
    "core-js": "2.4.1",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.1",
    "zone.js": "0.7.2",
    "systemjs": "0.19.27"
  },
  "devDependencies": {
    "bower-files": "3.11.3",
    "browser-sync": "2.11.1",
    "del": "2.2.0",
    "gulp": "3.9.1",
    "gulp-concat": "2.6.0",
    "gulp-sass": "2.2.0",
    "gulp-shell": "0.5.2",
    "gulp-sourcemaps": "1.6.0",
    "gulp-uglify": "1.5.3",
    "gulp-util": "3.0.7",
    "concurrently": "3.0.0",
    "lite-server": "2.2.2",
    "typescript": "2.2.2",
    "typings":"1.3.2"
  }
}
```
12. tsconfig.json file
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "lib": [ "es2015", "dom" ],
      "noImplicitAny": false,
      "suppressImplicitAnyIndexErrors": true
    }
  }
  ```
13. basic component parts app.component.ts file
  ```TYPESCRIPT
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
    <div class="container">
      <h1>My First Angular 2 App</h1>
    </div>
    `
  })

  export class AppComponent {

  }
  ```

14. app.module.ts file
  ``` TYPESCRIPT
  import { NgModule }      from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppComponent }   from './app.component';

  @NgModule({
    imports: [ BrowserModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
  })

  export class AppModule { }
  ```
15. main.ts file (entry point)
  ```typescript
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  import { AppModule } from './app.module';

  const platform = platformBrowserDynamic();

  platform.bootstrapModule(AppModule);
  ```
16. systemjs.config.js file
```Javascript
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
```

## Specs
see below

_final readme begins here_

# Taproom

#### An Epicodus 2-day project in Angular, 07.05.17

#### **By Jun Fritz and Anabel Ramirez**

## Description

This web application will allow a user and employee to view all beers/kegs sold by name, brewery, price, keg level, and alcohol content. Employees can add and edit keg listings.

|Behavior| Input (User Action/Selection) |Output|
|---|:---|:---|
|Patron see a list/menu of all available kegs.| "list of beers"|"list of beers"|
|For each keg, patron sees its name, brand, price and alcoholContent.|"Boneyard RPM, Boneyard Brewery, $6 20oz, 8%"|"Boneyard RPM, Boneyard Brewery, $6 20oz, 8%"|
|An employee can fill out a form when a new keg is tapped to add it to the list.| "Fill out form: name, brand, price and alcoholContent"| "beer name, brand, price and alcoholContent"|
|An employee has the option to edit a keg's properties after entering them to fix mistakes.|"change Boneyard to Stone"|"Stone"|
|A patron and/or employee can see how many pints are left in a keg. (A full keg has roughly 124 pints.)|"Boneyard 24 pints left"| "24 pints left"|
|An employee can click a button next to a keg whenever a pint is sold decreasing the number of pints left by 1.|"sells pint, clicks button"| keg 124 - 1 pint|
|An employee can see kegs with less than 10 pints left so they can be ready to change them.|"keg with >10 pints"|"keg colored red"|
|A patron sees color-coded kegs prices based on style of beer for easy readability.| "IPAs=orange, Ciders=light yellow"| "IPA=orange, Ciders=light yellow"|
|A patron can use the alcohol content property to display stronger beers differently than weaker beers.|"8% = green lettering, 5% = yellow lettering"| "Boneyard in green, Cider Riot in yellow"|

WISH LIST FUNCTIONALITY:

|Behavior| Input (User Action/Selection) |Output|
|---|:---|:---|
|Employee can click a button for 32oz growlers sold.|"click 32oz growler sold button"|keg 124 - 2 pints|
|Employee can click a button for 64oz growlers sold.|"click 64oz growler sold button"|keg 124 - 4 pints|
|A patron can filter kegs by style of beer.|"IPAs"|"list of IPAs"|
|Employee can mark a keg for discounted sale.|"edit Boneyard RPM $4/pint"| "Boneyard RPM $4/pint", keg turns blue|
|Employee can set a happy hour.|"keg prices lower"|"all kegs $4/pint"|


## Setup/Installation Requirements

To download and run this project:
1. Clone this repository to your desktop.
2. Run {$ npm install} and {$ bower install} in your terminal to gather required packages.
3. Run {$ gulp build} and then {$ gulp serve} to view the project in a web browser via a localhost.

## Support and contact details

If you have any issues or have questions, ideas, concerns, or contributions please contact the contributor through Github.

## Technologies Used

* Angular
* HTML
* CSS
* Bootstrap
* SASS

### License
This software is licensed under the MIT license.

Copyright (c) 2017 **Andrew Glines for Epicodus**
