var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
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
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


/* concat JS files */
gulp.task('concat', function() {
  return gulp.src('./src/js/**/*.js')
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
});


/* run server */
gulp.task('server', function() {
  nodemon({script: 'server.js', tasks: ['lint']})
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
