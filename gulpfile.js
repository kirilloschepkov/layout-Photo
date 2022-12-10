const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const imageWebp = require('gulp-webp');
const concat = require('gulp-concat');
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const sass = require('gulp-sass')(require('sass'));


//clean dist directory
const clean = () => {
  return del('dist/*')
}

// sass
const stylesSass = () => {
  return src('./src/styles/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/styles'))
    .pipe(browserSync.stream());
}

// styles
const styles = () => {
  return src(['./src/styles/normalize.css', './src/styles/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream());
};

//scripts
const scripts = () => {
  return src('./src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

//simple export
const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

// convert in webp
const images = () => {
  return src('./src/img/*.{jpg,jpeg,png}')
    .pipe(imageWebp())
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
};

//export other images
const imagesOther = () => {
  return src([
    './src/img/*.svg',
    './src/img/default/*.{jpg,jpeg,png}',
    './src/img/favicon/*'
  ])
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
};

//svg sprite
const svgSprites = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
}

//check change
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });

  watch('./src/styles/scss/**/*.scss', stylesSass);
  watch('./src/styles/**/*.css', styles);
  watch('./src/*.html', html);
  watch('./src/scripts/**/*.js', scripts);
  watch('./src/resources/**', resources);
  watch('./src/img/*.svg', imagesOther);
  watch('./src/img/**/*.{jpg,jpeg,png}', images);
  watch('./src/img/svg/**.svg', svgSprites);
  watch('./src/fonts/*.ttf', convertTtfWoff);
  watch('./src/fonts/*.ttf', convertTtfWoff2);
}

//minify html
const html = () => {
  return src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

const convertTtfWoff = () => {
  return src('./src/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./dist/fonts'))
    .pipe(browserSync.stream());
}

const convertTtfWoff2 = () => {
  return src('./src/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./dist/fonts'))
    .pipe(browserSync.stream());
}

exports.stylesSass = stylesSass;
exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.resources = resources;
exports.images = images;
exports.imagesSvg = imagesOther;
exports.svgSprites = svgSprites;
exports.convertTtfWoff = convertTtfWoff;
exports.convertTtfWoff2 = convertTtfWoff2;

exports.default = series(clean, scripts, stylesSass, styles, resources, images, imagesOther, svgSprites, convertTtfWoff, convertTtfWoff2, html, watchFiles);
