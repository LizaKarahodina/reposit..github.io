var gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    browser      = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    consolidate  = require('gulp-consolidate');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(browser.stream({match: '**/*.css'}));
});

// Builds the documentation and framework files
//gulp.task('build', ['clean', 'sass', 'javascript']);

// Starts a BrowerSync instance
gulp.task('serve', ['sass'], function(){
  browser.init({
	  	server: {
            baseDir: "./"
        }
  	});
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['serve'], function() {    
  gulp.watch(['sass/**/*.scss'], ['sass']); 
  gulp.watch('./**/*.html').on('change', browser.reload);
});


imagemin(['src/*.{jpg,png}'], 'build/img', {
    plugins: [
        imageminJpegtran(),
        imageminPngquant({quality: '65-80'})
    ]
}).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
});