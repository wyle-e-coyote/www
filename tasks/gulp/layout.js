const gulp = require("gulp");
const helper = require("./helper");

gulp.task("html", function(){
    helper.copy(["./html/*.html", "index.html"], "./public");
});