"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');

//source directories
const source = {
  mainSrc: "./src",
  scss: './src/build/scss',
  dist: './src/assets'
}

//sass to css
gulp.task('sass', () => {
  return gulp.src(`${source.scss}/**/*.scss`)
  .pipe(sass())
  .pipe(gulp.dest(`${source.dist}/css`))
  .pipe(browserSync.stream());
});

//browser sync
gulp.task('bw-sync', () => {
  browserSync.init({
    server: {
      baseDir: source.mainSrc
    }
  });

  gulp.watch( `${source.scss}/**/*.scss`, ['sass']);
  gulp.watch(`${source.mainSrc}/*.html`).on('change', browserSync.reload);
});