const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sourceMaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const merge = require("merge2");

const path = {
  nodePath: "node_modules",
  stylesPath: "assets/scss",
  jsPath: "assets/js",
};

gulp.task("move-icons", () => {
  return gulp
    .src([path.nodePath + "/feather-icons/dist/icons/*.svg"])
    .pipe(gulp.dest("./public/icons"));
});

gulp.task("vendor-js", () => {
  const streamOne = gulp
    .src([
      path.nodePath + "/jquery/dist/jquery.min.js",
      path.nodePath + "/bootstrap/dist/js/bootstrap.bundle.js",
      path.nodePath + "/feather-icons/dist/feather.js",
      path.nodePath + "/axios/dist/axios.js",
    ])
    .pipe(
      uglify().on("error", (err) => {
        console.log(err);
      })
    );
  const streamTwo = gulp.src([
    path.nodePath + "/turbolinks/dist/turbolinks.js",
    path.nodePath + "/stimulus/dist/stimulus.umd.js",
  ]);
  return merge(streamOne, streamTwo)
    .pipe(concat("vendor-script.min.js"))
    .pipe(gulp.dest("public"));
});

gulp.task("custom-js", () => {
  return gulp
    .src([path.jsPath + "/ListItems.js", path.jsPath + "/app.js"])
    .pipe(sourceMaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
        plugins: ["transform-class-properties"],
      })
    )
    .pipe(concat("custom-script.js"))
    .pipe(gulp.dest("public"))
    .pipe(
      uglify().on("error", (err) => {
        console.log("CUSTOM JS ERROR ", err);
      })
    )
    .pipe(gulp.dest("public"))
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("public"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public"))
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("public"));
});

gulp.task("styles", () => {
  return gulp
    .src([
      path.nodePath + "/bootstrap/dist/css/bootstrap.css",
      path.stylesPath + "/**/*.scss",
    ])
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        browsers: "last 2 versions",
        cascade: false,
      })
    )
    .pipe(concat("style.css"))
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("public"));
});

gulp.task("watch", () => {
  gulp.watch(path.stylesPath + "/**/*.scss", gulp.parallel("styles"));
  gulp.watch(path.jsPath + "/**/*.sjs", gulp.parallel("custom-js"));
});

gulp.task("default", gulp.series("watch", "vendor-js", "styles", "custom-js"));
