var gulp = require('gulp')
var webpack = require('webpack-stream')
var del = require('del')

var webpackConfig = require('./webpack.config.pro')

gulp.task('default', ['static', 'phaser','webpack']);

gulp.task('webpack', function () {
  return gulp
    .src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/scripts'));
})

gulp.task('static', function () {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('build/'))
})

gulp.task('phaser', function () {
  return gulp.src('./node_modules/phaser/build/*.js')
    .pipe(gulp.dest('build/scripts/'))
})

gulp.task('clean', function () {
  return del([
    'build/**/*'
  ]);
})
