// ============ JCLDC ==============

// Include gulp
var gulp = require('gulp');

// Include Plugins
var ftp = require('gulp-ftp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(rename({suffix: '.min'}))
        .pipe(sass({style: 'compressed'}))
        .pipe(gulp.dest('css'));
});

// Dev FTP: CSS
gulp.task('ftp-dev', function() {
    return gulp.src('css/*')
        .pipe(ftp({
            host: '66.241.194.6',
            user: 'chrisd',
            pass: 'aachrisd',
            remotePath: 'JCLDC/css'
        }));
});

// Dev FTP: Sass
gulp.task('ftp-dev-scss', function() {
    return gulp.src('scss/*')
        .pipe(ftp({
            host: '66.241.194.6',
            user: 'chrisd',
            pass: 'aachrisd',
            remotePath: 'JCLDC/scss'
        }));
});

// Prod FTP: CSS
gulp.task('ftp', function() {
    return gulp.src('css/*')
        .pipe(ftp({
            host: '66.241.194.5',
            user: 'chrisd',
            pass: 'G00berz',
            remotePath: '/Atlas/Sites/KenticoCMS 7.0.103/JCLDC/css'
        }));
});

// Prod FTP: Sass
gulp.task('ftp-scss', function() {
    return gulp.src('scss/*')
        .pipe(ftp({
            host: '66.241.194.5',
            user: 'chrisd',
            pass: 'G00berz',
            remotePath: '/Atlas/Sites/KenticoCMS 7.0.103/JCLDC/scss'
        }));
});

// FTP Everything to Dev and Prod
gulp.task('ftp-all', ['ftp-dev', 'ftp-dev-scss', 'ftp', 'ftp-scss']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('css/*.css', ['ftp-dev', 'ftp']);
});

// Default Task
gulp.task('default', ['watch']);