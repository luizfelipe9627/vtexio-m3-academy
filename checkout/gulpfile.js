const gulp = require("gulp"),
    gulpif = require("gulp-if"),
    del = require("del"),
    connect = require("gulp-connect"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass")(require("sass"));

/**
    ___ _           _            _             _
  / __| |_  ___ __| |_____ _  _| |_   ___ ___| |_ _  _ _ __
 | (__| ' \/ -_) _| / / _ \ || |  _| (_-</ -_)  _| || | '_ \
  \___|_||_\___\__|_\_\___/\_,_|\__| /__/\___|\__|\_,_| .__/
                                                      |_|
 */

const webpack = require("webpack");
const pacote = require("../package.json");

const isProduction = process.env.NODE_ENV === "production";

const paths = {
    styles: {
        src: "src/arquivos/sass/*.{scss,css,sass}",
        lib: "src/arquivos/sass/lib",
        watch: "src/arquivos/sass/**/*.scss",
    },
    scripts: {
        watch: "src/arquivos/js/**/*.js",
    },
    img: {
        src: "src/arquivos/img/*.{png,gif,jpg}",
        watch: "src/arquivos/img/**/*.{png,gif,jpg}",
    },
    fonts: {
        src: "src/arquivos/fonts/**.*",
    },
    output: "dist",
    outputStatic: "dist/arquivos",
    tmp: ".temp",
};

function clean() {
    return del([paths.output, paths.tmp]);
}

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(
            sass({
                outputStyle: "compressed",
            }).on("error", sass.logError)
        )
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(
            rename({
                prefix: pacote.name + "--",
                extname: ".css",
            })
        )
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(paths.outputStatic))
        .pipe(connect.reload());
}

function scripts() {
    let webpackConfig = require("./webpack.dev.js");

    if (process.env.NODE_ENV === "production") {
        webpackConfig = require("./webpack.prod.js");
    }

    return new Promise((resolve) =>
        webpack(webpackConfig, (err, stats) => {
            if (err) console.log("Webpack", err);

            console.log(
                stats.toString({
                    all: false,
                    modules: false,
                    maxModules: 0,
                    errors: true,
                    warnings: true,
                    moduleTrace: true,
                    errorDetails: true,
                    colors: true,
                    chunks: true,
                })
            );

            resolve();
            connect.reload();
        })
    );
}

function customFonts() {
    return gulp
        .src(paths.fonts.src)
        .pipe(
            rename((path) => ({
                dirname: "",
                basename: path.basename,
                extname: path.extname + ".css",
            }))
        )
        .pipe(gulp.dest(paths.outputStatic))
        .pipe(connect.reload());
}

function watch() {
    devServer();
    gulp.watch(paths.scripts.watch, { ignoreInitial: false }, scripts);
    gulp.watch(paths.styles.watch, { ignoreInitial: false }, styles);
    gulp.watch(paths.fonts.src, { ignoreInitial: false }, customFonts);
}

function devServer() {
    connect.server({
        root: paths.output,
        livereload: true,
        port: 3000,
    });
}

const build = gulp.series(clean, gulp.parallel(scripts, styles, customFonts));

exports.build = build;
exports.clean = clean;
exports.scripts = scripts;
exports.styles = styles;
exports.devServer = devServer;
exports.watch = gulp.series(build, watch);
