var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var coffee 	= require('gulp-coffee');
var concat 	= require('gulp-concat');
var uglify 	= require('gulp-uglify');
var imagemin 	= require('gulp-imagemin');
var sourcemaps 	= require('gulp-sourcemaps');
var del 	= require('del');

var paths = {
  scripts: ['./src/js/**/*', '!external/**/*'],
  images: '.src/img/**/*',
  dest: './dist/',
  destimage: './dist/image'
};
config: {
  browsersync: {
    //array of files and folder to watch
    watch: [
      '.src/**/*'
    ]
  }
}
gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('images', () =>
    gulp.src(paths.images)
        .pipe(imagemin({optimazationLevel: 5}))
        .pipe(gulp.dest(paths.destimage))
);

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/",
	    index: "index.html"
	    //directory: true
        },
	port: 4005
    });
    gulp.watch('src/**/*', ['bs-reload']); //js change
});

// Rerun the task when a file changes
gulp.task('watch', () =>  {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
    gulp.watch(paths.scripts,['server-reload']);
 }
);

gulp.task('server-reload', function (callback) {
  return sequence(['build'], ['bs-reload'], callback);
});

gulp.task('bs-reload', function () {
  return browserSync.reload();
});


// or...
//
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        proxy: "yourlocal.dev"
//    });
//});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.dest);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images']);
gulp.task('serve', ['browser-sync']);
