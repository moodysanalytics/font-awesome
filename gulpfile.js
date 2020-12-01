// Gulpfile.js

"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    minifyCSS = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path');

gulp.task("sass", function (cb) {
    gulp.src("scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(rename(function (path) {
            path.extname = '.min.css'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest("css"))
        .pipe(sourcemaps.write("css", {
            sourceMappingURL: function (file) { //This is to reference the correct paths for our map file..
                return "css/" + path.basename(file.path) + ".map"; //require the path module..
            }
        }))
        .pipe(rename(function (path) {
            if (path.extname == ".map") { //Only change the paths of map files not the .min files
                path.dirname = "./css";
            }
        }))
        .pipe(gulp.dest("."));
    cb();
});

gulp.task("clean", function (cb) {
    del([
        "css/**",
    ]);
    cb();
});

gulp.task("default", gulp.series("clean", "sass"));