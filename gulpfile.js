var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	compass = require('gulp-compass'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

gulp.task('compass', function() {
	gulp.src('./scss/styles.scss')
		.pipe(compass({
			css: './css',
			sass: './scss',
		}).on('error', function(error) {
			console.log(error);
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('coffeescript', function() {
	gulp.src('./coffeescript/start.coffee', {read: false})
		.pipe(browserify({
			transform: ['coffeeify'],
			extensions: ['.coffee'],
			basedir: './coffeescript'
		}).on('error', function(error) {
			console.log(error);	
		}))
		.pipe(concat('start.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('default', ['compass', 'coffeescript']);

gulp.watch('./scss/**/*.scss', ['compass']);

gulp.watch('./coffeescript/**/*.coffee', ['coffeescript']);