let gulp = require('gulp');
let gls = require('gulp-live-server');
let webpack = require('webpack-stream');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');


const paths = {
  js: './src/js/entry.js',
  sass: './src/sass/**/*.scss',
  webpack: './webpack.config.js'
};

gulp.task('sass', () => {
  gulp.src('./src/sass/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass({
    	outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', () => {
  gulp.src('./src/js/entry.js')
	.pipe(webpack(require(paths.webpack)))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', function() {
  let server = gls.static('./', 8888);
  server.start();
  gulp.watch([paths.sass, paths.js], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass', 'js']);
