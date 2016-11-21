var gulp = require("gulp");
var ts = require("gulp-typescript");
require("./tasks/gulp/server");
require("./tasks/gulp/layout");
require("./tasks/gulp/blog");

gulp.task("default", ["server", "blog", "html"]);
