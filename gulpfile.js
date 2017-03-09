var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var bs = browserSync;
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var cssNano = require('gulp-cssnano');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var wiredep = require('wiredep').stream;
var paths = {
  assets: {
    js: './assets/scripts/**/*.js',
    jsFolder: './assets/scripts',
    scss: './assets/styles/**/*.scss',
    mainScss: './assets/styles/*.scss',
    video: './assets/video/*.+(mp4|ogv|webm)',
    images: './assets/images/**/*',
    fonts: './assets/fonts/**/*.+(eot|woff|woff2|ttf)'
  },
  bowerComponents: './bower_components/',
  dist: {
    js: './dist/scripts',
    styles: './dist/styles',
    video: './dist/video',
    images: './dist/images',
    fonts: './dist/fonts'
  }
}

gulp.task('browser-sync', ['styles'], function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('styles', function() {
  return gulp.src(paths.assets.mainScss)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(cssNano({
      safe: true
    }))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(bs.reload({
      stream: true
    }));
});
gulp.task('fonts', function() {
  return gulp.src(paths.assets.fonts)
    .pipe(gulp.dest(paths.dist.fonts))
    .pipe(bs.reload({
      stream: true
    }));
})
gulp.task('componentsJs', function() {
  var filesJs = mainBowerFiles('**/*.js');
  filesJs.push('./bower_components/gsap/src/uncompressed/plugins/ScrollToPlugin.js');
  //filesJs.push('./bower_components/gsap/src/uncompressed/plugins/CSSPlugin.js');
  //filesJs.push('./bower_components/gsap/src/uncompressed/plugins/CSSRulePlugin.js');
  filesJs.push('./bower_components//scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js');
  //filesJs.push('./bower_components/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');
  return gulp.src(filesJs)
    .pipe(plumber())
    .pipe(uglify())
    //.pipe(sourcemaps.init()) // hide
    .pipe(concat('components.js'))
    //.pipe(sourcemaps.write()) // hide
    .pipe(gulp.dest(paths.dist.js));
});
gulp.task('componentsStyles', function() {
  var
    filesStyles = mainBowerFiles('**/*.css');
  return gulp.src(filesStyles)
    .pipe(plumber())
    .pipe(concat('components.css'))
    .pipe(gulp.dest(paths.dist.styles))
});
gulp.task('scripts', function() {
  return gulp.src([
      paths.assets.jsFolder + '/debug.addIndicators.js',
      paths.assets.jsFolder + '/scrollOff.js',
      paths.assets.jsFolder + '/main.js',
      paths.assets.jsFolder + '/scrollMagicViews/view01.js',
      paths.assets.jsFolder + '/scrollMagicViews/view02.js',
      paths.assets.jsFolder + '/scrollMagicViews/view03.js',
      paths.assets.jsFolder + '/scrollMagicViews/view04.js',
    //  paths.assets.jsFolder + '/scrollMagicViews/view05.js',
      paths.assets.jsFolder + '/scrollMagicViews/view06.js'
    ])
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter(stylish, {
      beep: true
    }))
    .pipe(plumber())
    //.pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(bs.reload({
      stream: true
    }));
});
gulp.task('video', function() {
  return gulp.src(paths.assets.video)
    .pipe(gulp.dest(paths.dist.video))
});
gulp.task('images', function() {
  return gulp.src(paths.assets.images)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        removeUnknownsAndDefaults: false
      }, {
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest(paths.dist.images))
    .pipe(bs.reload({
      stream: true
    }));
});
gulp.task('clean', require('del').bind(null, ['./dist/']));
gulp.task('default', ['componentsJs', 'componentsStyles', 'video', 'images', 'fonts']);
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(paths.assets.scss, ['styles']);
  gulp.watch(paths.assets.js, ['scripts']);
  gulp.watch(paths.assets.video, ['video']);
  gulp.watch(paths.assets.images, ['images']);
  gulp.watch("*.html").on('change', bs.reload);
});
