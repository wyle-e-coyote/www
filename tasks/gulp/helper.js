const gulp = require("gulp");

module.exports.copy = (src, dsc) =>
    gulp.src(src).pipe(gulp.dest(dsc))