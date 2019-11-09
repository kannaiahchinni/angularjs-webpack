var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
//var environments = require('gulp-environments');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {
    return browserify('./src/app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('lint', function() {
    return gulp.src('./src/app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
    return gulp.src(['./src/assets/**/*.js'])
            .pipe(uglify())
            .pipe(concat('vendor.min.js'))
            .pipe(gulp.dest('./public/'));
});

gulp.task('copy', function() {
     gulp.src(['./src/**/*.html','./src/**/*.css'])
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
}); 

gulp.task('scss', function() {
    gulp.src('./src/assets/scss/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./src/assets/stylesheets/'));
});

gulp.task('build',['lint', 'scss', 'scripts']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
            // The key is the url to match
            // The value is which folder to serve (relative to your current working directory)
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"
            }
        },
        browser:"Chrome"
    });
});

gulp.task('default', ['browser-sync'], function(){
    gulp.watch("./src/**/*.*", ["build"]);
    gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});
