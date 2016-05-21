var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    less = require('gulp-less'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    path = require('path');


/* LESS */
gulp.task('less', function() {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./public/css'));
});


/* JS lint */
gulp.task('lint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        'modules': true
      },
      rules: {
        'my-custom-rule': 1,
        'strict': 2
      },
      globals: {
        'jQuery': false,
        '$': true
      },
      envs: [
        'browser'
      ]
    }))
});


/* concat JS files */
gulp.task('concat', function() {
  //TODO requirejs ?
  //'./src/js/**/*.js'

  return gulp.src([
      './src/js/person.js',
      './src/js/index.js'
    ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('pixi-demo.js'))
    .pipe(gulp.dest('./public/compiled/'));
});


gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', ['lint', 'concat']);

  gulp.watch('./src/less/**/*.less', ['less']);
});


/* build project */
gulp.task('build', function() {
  gulp.run('less', 'lint', 'concat');

  // concat node modules into one file
  return gulp.src([
      './node_modules/pixi.js/bin/pixi.min.js'
    ])
    .pipe(concat('node-modules.js'))
    .pipe(gulp.dest('./public/compiled/'));
});

/* run server */
gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    tasks: ['lint'],

    //TODO ignore doesn't work
    ignore: ['src/**/*']
  })
    .on('restart', function() {
      console.log('Server has been restarted!')
    })
});


gulp.task('default', function() {
  // build and run server
  gulp.run('build', 'server');

  // watch
  gulp.run('watch');
});
