const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Compila o SASS e gera o CSS com sourcemaps
function compileSass() {
    return gulp.src('./source/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Comprime os JS
function comprimeJavascript() {
    return gulp.src('./source/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}

// Otimiza as imagens
function comprimeImagens() {
    return gulp.src('./source/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Tarefa padrão: fica assistindo mudanças
exports.default = function() {
    gulp.watch('./source/styles/**/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('./source/scripts/**/*.js', { ignoreInitial: false }, gulp.series(comprimeJavascript));
    gulp.watch('./source/images/**/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
};
