var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var rimraf      = require('rimraf');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var saveLicense = require('uglify-save-license');

// Clean public
gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

// build
gulp.task('build', ['clean'], function() {
  var assets = $.useref.assets();
  var nonVendor = 'js/**/*.js';
  return gulp.src('assets/index.html')
    .pipe(assets)
    .pipe($.if(nonVendor, $.ngmin()))
    .pipe($.if('*.js', $.uglify({
      mangle: false,
      preserveComments: saveLicense
    })))
    .pipe($.if('*.css', $.autoprefixer('last 2 versions')))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(assets.restore())
    .pipe($.useref())
    // .pipe($.if('*.html', $.minifyHtml()))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}));
});

// server
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
});

// watch
gulp.task('watch', ['server'], function(){
  gulp.watch('assets/**/*.{html,css,js}', ['build']);
});

// default
gulp.task('default', function() {
  runSequence(
    'build',
    'watch'
  );
});