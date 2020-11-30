"use strict";

const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('clean', (cb) => {
    del([])

    cb();
});

gulp.task('sass', function (cb) {
    gulp.src('./scss/**/*.scss')
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulp.dest('./css'));

    cb();
});

gulp.task('default', gulp.series(['clean', 'sass']));