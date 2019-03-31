const
    gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if'),
    urls = require('gulp-resolve-url'),
    bs = require('browser-sync'),
    imgmin = require('gulp-imagemin'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer');

const production = process.env.NODE_ENV === 'production';

const jsFiles = [
    'src/js/jquery-3.3.1.min.js',
    'src/js/main.js'
];


gulp.task('html', () => {
    return gulp.src('src/**.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', () => {
    return gulp.src('src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        // .pipe(urls())
        .pipe(concat('main.css'))
        .pipe(gulpIf(!production, sourcemaps.write()))
        .pipe(gulpIf(production, cssmin()))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/**.*', {base: 'src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(gulpIf(!production, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpIf(!production, sourcemaps.write()))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('images', () => {
    return gulp.src('src/img/**', {base: 'src'})
        .pipe(imgmin())
        .pipe(gulp.dest('dist/'))
});

gulp.task('serve', () => {
    bs.init({
        server: 'dist'
    });
    bs.watch('src/**/**.*').on('change', bs.reload)
});

gulp.task('watch', () => {
    gulp.watch('src/**.html', gulp.series('html'));
    gulp.watch(['src/styles/**/*.scss', 'bootstrap-4.2.1/scss/**.*'], gulp.series('styles','html'));
    gulp.watch('src/fonts/**/**.*', gulp.series('fonts'));
    gulp.watch(jsFiles, gulp.series('js'));
    gulp.watch('src/img/**.*', gulp.series('images'));
});

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'styles', 'fonts', 'js', 'images')));

gulp.task('develop', gulp.series('build', gulp.parallel('watch', 'serve')));