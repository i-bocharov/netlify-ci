const gulp = require('gulp')
const concat = require('gulp-concat-css')
const plumber = require('gulp-plumber')
const del = require('del')
const browserSync = require('browser-sync').create()

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
}

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
}

function css() {
  return gulp.src('src/blocks/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream: true}))
}

function fonts() {
  return gulp.src('src/fonts/**/*.{css,woff,woff2}')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({stream: true}))
}

function video() {
  return gulp.src('src/video/**/*.{mp4,avi}')
        .pipe(gulp.dest('dist/video'))
        .pipe(browserSync.reload({stream: true}))
}

function clean() {
  return del('dist')
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html)
  gulp.watch(['src/blocks/**/*.css'], css)
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images)
  gulp.watch(['src/fonts/**/*.{css,woff,woff2}'], fonts)
  gulp.watch(['src/video/**/*.{mp4,avi}'], video)
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, video))
const watchapp = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.css = css
exports.images = images
exports.fonts = fonts
exports.video = video
exports.clean = clean

exports.build = build
exports.watchapp = watchapp
exports.default = watchapp
