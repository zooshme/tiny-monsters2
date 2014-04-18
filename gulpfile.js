var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	compass = require('gulp-compass'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

gulp.task('compass', function() {
	gulp.src('./scss/*.scss')
		.pipe(compass({
			css: './css',
			sass: './scss',
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('coffeescript', function() {
	gulp.src('./coffeescript/app.coffee', {read: false})
		.pipe(browserify({
			transform: ['coffeeify'],
			extensions: ['.coffee'],
			baseDir: './coffeescript'
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('default', ['compass', 'coffeescript']);

gulp.watch('./scss/**/*.scss', ['compass']);

gulp.watch('./coffeescript/*.coffee', ['coffeescript']);