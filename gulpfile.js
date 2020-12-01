// Gulpfile.js

"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    minifyCSS = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('scss', function (cb) {
    gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));

    cb();
});


gulp.task('css-minify', function (cb) {
    gulp.src("./css/font-awesome.css", { base: "." })
        .pipe(rename(function (path) {
            path.extname = '.min.css'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('.'));
    cb();
});

gulp.task("clean", function (cb) {
    del([
        "css/**",
    ]);
    cb();
});

gulp.task("default", gulp.series("clean", "scss", "css-minify"));