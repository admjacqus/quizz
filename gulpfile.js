var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var autoprefixerOptions = {
	browsers: ["last 5 versions", "> 10%"]
};
var compass = require("gulp-compass");

gulp.task("sass", function() {
	return gulp
		.src("./sass/*.scss")
		.pipe(
			compass({
				config_file: "./config.rb",
				css: "css",
				sass: "sass"
			}),
			sass({
				outputStyle: "compressed"
			}).on("error", sass.logError)
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest("./css"));
});

gulp.task("default", function() {
	browserSync.init({
		port: 9876,
		//  https: true,
		ghostMode: false,
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("./js/*.js").on("change", browserSync.reload);
	gulp.watch("./sass/*.scss", ["sass"]);
	gulp.watch("./css/*.css").on("change", browserSync.reload);
	gulp.watch("**/*.html").on("change", browserSync.reload);
});
