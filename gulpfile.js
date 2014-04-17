var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	compass = require('gulp-compass');

gulp.task('compass', function() {
	gulp.src('./scss/*.scss')
		.pipe(compass({
			css: './css',
			sass: './scss',
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('coffee', function() {
	gulp.src('./coffee/*.coffee')
		.pipe(coffee())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['compass', 'coffee']);

gulp.watch('./scss/**/*.scss', ['compass']);

gulp.watch('./coffee/*.coffee', ['coffee']);