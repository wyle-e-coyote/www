const gulp = require("gulp");
const helper = require("./helper");

gulp.task("layout", ["html", "css", "img"]);

gulp.task("html", function(){
    helper.copy(["./html/*.html", "index.html"], "./public");
});

gulp.task("css", function(){
    helper.copy("./css/*.css", "./public/css");
})

gulp.task("img", function(){
    helper.copy("./images/*.*", "./public/img");
})