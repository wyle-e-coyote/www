var gulp = require("gulp");
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json", { noImplicitAny: true });

gulp.task("server", function(){
    var tsResults = gulp.src(["src/server/*.ts", "./typings/**/*.d.ts"])
        .pipe(tsProject());

    return tsResults.js.pipe(gulp.dest("public"));
});

module.exports = {
    tsProject
}