var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');

gulp.task("watch", function(){
  gulp.watch(['./public/*.html','./public/**/*.css','./public/**/*.js'], function(){
      livereload.reload();
  });
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'server.js',
    ext: 'html coffee ejs',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop',
  'watch'
]);
