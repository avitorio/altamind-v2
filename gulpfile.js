var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');

gulp.task('styles', function() {
  gulp.src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./css'))
    .pipe(uncss({
        html: ['http://localhost:3000/'],
        ignore: ['#hero video', '#work video', 'nav.animated.slideUp', 'nav.animated.slideDown', /cmn/, /overlay-hugeinc/, /third/ ]
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'))


});

// Watch task
gulp.task('default',function() {
  // run task initially, after that watch
  gulp.start('styles');
  gulp.watch('./scss/*.scss',['styles']);
});