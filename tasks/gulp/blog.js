var gulp = require("gulp");
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json", { noImplicitAny: true });

gulp.task("blog", function(){
    var tsResults = gulp.src(["src/blog/*.ts", "src/blog/*.tsx", "./typings/**/*.d.ts"])
        .pipe(tsProject());

    return tsResults.js.pipe(gulp.dest("public/javascript"));
});

module.exports = {
    tsProject
}