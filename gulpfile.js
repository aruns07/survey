let fs = require('fs'),
	gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	webpack = require('webpack'),
	gulpWebpack = require('webpack-stream'),
	del = require('del'),
	less = require('gulp-less'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer');
	run = require('gulp-run'),
	server = require('gulp-express'),
	plumber = require('gulp-plumber');

let projectPackage = JSON.parse(fs.readFileSync('package.json'));


gulp.task('lint', () => {
	return gulp.src('src/script/**/*.js')
			.pipe(eslint({
				"extends": "eslint:recommended",
				"parserOptions": {
					"ecmaVersion": 6,
					"sourceType": "module"
				},
				"rules": {
					"camelcase": 1
				},
				"fix": true
			}))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});

gulp.task('script', () => {
	return gulp.src('src/script/main.js')
			.pipe(gulpWebpack({
				output: {
					filename: 'main.js',
					sourceMapFilename: 'main.js.map'
				},
				resolve: {
					alias: {
						handlebars: 'handlebars/dist/handlebars.min.js'
					}
				},
				module: {
					loaders: [
					  {
					    test: /\.js$/,
					    exclude: /(node_modules)/,
					    loader: 'babel',
					    query: {
					      presets: ['es2015']
					    }
					  }
					]
				},
				plugins: [
			        new webpack.optimize.UglifyJsPlugin({
			            compress: {
			                warnings: false,
			            },
			            output: {
			                comments: false,
			                semicolons: true,
			            }
			        })
			    ],
				devtool: 'source-map'
			}, webpack))
			.pipe(gulp.dest('dist/'));
});

gulp.task('style', () => {
	return gulp.src('src/style/**/*.less')
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(cssnano())
			.pipe(gulp.dest('dist/style/'));
});

gulp.task('other', () => {
	return gulp.src('src/views/**/*')
			.pipe(gulp.dest('dist/views'));
});

gulp.task('serve', () => {
	server.run(['web.js']);

	gulp.watch('src/views/**/*', ['other']);
	gulp.watch('src/script/**/*', ['script']);
	gulp.watch('src/style/**/*', ['style']);

});

gulp.task('clean', del.bind(null, ['dist/**']));

gulp.task('build', [ 'lint', 'script', 'style', 'other']);

gulp.task('default', ['clean'], () => {
	gulp.start('build');
});