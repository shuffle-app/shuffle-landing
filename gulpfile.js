const projFolder = '';

const config = {
  dir : {
    source : {
      dir: 'dev/',
      blocks: 'dev/common.blocks/',
      js: 'dev/js/',
      sass: 'dev/styles/',
      pug: 'dev/pug/',
      fonts: 'dev/fonts/',
      images: 'dev/images/'
    },
    target : {
      dist: 'dist/',
      css: 'dist/css/',
      images: 'dist/img/',
      js: 'dist/js/',
      fonts: 'dist/fonts/'
    }
  }
}

import {deleteAsync} from 'del';//очищать папку dist
import {create as bsCreate} from 'browser-sync';
const browserSync = bsCreate();

import gulp from 'gulp';
import gulpAutoprefixer from'gulp-autoprefixer';//расставляет префиксы в css для старых браузеров
import gulpBabel from'gulp-babel';//Преобразует js к более старым версиям
import gulpCleanCss from'gulp-clean-css';//Минификация CSS
//import gulpImagemin from'gulp-imagemin';//Минификация изображений
  //import imageminGifsicle from 'imagemin-gifsicle';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';

import sourcemaps from 'gulp-sourcemaps';

import gulpWebp from 'gulp-webp';
import gulpPug from'gulp-pug';
import pugIncludeGlob from 'pug-include-glob';
import gulpPlumber from'gulp-plumber';//Позволяет при ошибках не останавливать работу
import dartSass from 'sass';
   import gulpSass from 'gulp-sass';
   const sass = gulpSass(dartSass);
import sassGlob from '@artprog/gulp-sass-glob';
import gulpUglify from'gulp-uglify';

import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import gulpConcat from 'gulp-concat';

// import config from './config.js';

function clean() {
  return deleteAsync(config.dir.target.dist);
}


function fonts() {
  return gulp.src(config.dir.source.fonts + '**/*.*')
    .pipe(gulp.dest(config.dir.target.fonts));
}

function pug2html() {
  return gulp.src([
      config.dir.source.pug + '*.pug',
      '!' + config.dir.source.pug + '_*.pug'
    ])
    .pipe(gulpPlumber())
    .pipe(gulpPug({
      pretty:true,
      plugins : [
          pugIncludeGlob({/*options*/})
        ]
    }))
    .pipe(gulpPlumber.stop())
    .pipe(gulp.dest(config.dir.target.dist))
    .pipe(browserSync.stream({
            once: true
        }));
}

function scss2css() {
  return gulp.src([
        config.dir.source.sass + '*.scss',
        config.dir.source.sass + '**/*.scss',
        '!' + config.dir.source.sass + '**/_*.scss'
    ])
    .pipe(gulpPlumber())
    
    .pipe(sourcemaps.init())
    .pipe(sassGlob({
            nosort: true
        }))
    .pipe(sass())
    .pipe(gulpCleanCss({
      level:2
    }))
    .pipe(gulpAutoprefixer('last 3 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpPlumber.stop())
    
    .pipe(gulp.dest(config.dir.target.css))
    .pipe(browserSync.stream());
}

function scripts() {
  // return gulp.src( config.dir.source.js +'*.js')
  return gulp.src( [config.dir.source.js +'*.js', config.dir.source.blocks + '**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(gulpConcat('main.js'))
    .pipe(gulpBabel({
      presets: ['@babel/env']
    }))
    .pipe(gulpUglify())
    .pipe ( sourcemaps.write('.') )
    .pipe(gulp.dest(config.dir.target.js))
    .pipe(browserSync.stream());
}

function jsLibs() {
  return gulp.src([config.dir.source.js + 'libs/**/*.*'])
    // .pipe(gulpConcat('libs.js'))//Конкатенирует все файлы библиотек в один
    .pipe(gulp.dest(config.dir.target.js + 'libs'));
}

function imageMin() {
  return gulp.src([
    config.dir.source.images + '**/*.{JPG,jpeg,JPEG,jpg,gif,png,svg,webp,webP}',
    '!' + config.dir.source.images + 'sprite/*',
    ])
    .pipe(gulpWebp())
    .pipe(gulp.dest(config.dir.target.images))
    .pipe(gulp.src([
      config.dir.source.images + '**/*.{JPG,jpeg,JPEG,jpg,gif,png,svg,webp,webP}',
      '!'+config.dir.source.images+'sprite/*']))
    .pipe(imagemin([
      gifsicle({interlaced: true}),
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
      svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: true
          },
          {
            name: 'cleanupIDs',
            active: false
          }
        ]
      }),
    ]))
    
    
    .pipe(gulp.dest(config.dir.target.images))

}

function imageMove() {
  return gulp.src([
    config.dir.source.images + '**/*.{JPG,jpeg,JPEG,jpg,gif,png,svg,webp,webP}',
    '!' + config.dir.source.images + 'sprite/*',
    ])
    .pipe(gulpWebp())
    .pipe(gulp.dest(config.dir.target.images))
    .pipe(gulp.src([
      config.dir.source.images + '**/*.{JPG,jpeg,JPEG,jpg,gif,png,svg,webp,webP}',
      '!'+config.dir.source.images+'sprite/*'])) 
    .pipe(gulp.dest(config.dir.target.images))

}

function svgSpriteBuild() {
  //подробнее почитать тут http://glivera-team.github.io/svg/2016/06/13/svg-sprites-2.html
  return gulp.src(config.dir.source.images + 'sprite/*.svg')
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg",
        }
      }
    }))
    .pipe(gulp.dest(config.dir.source.images + 'sprite'));
};

function watch() {
  browserSync.init({
    server: {
      baseDir: config.dir.target.dist,
    }
  });
  gulp.watch(config.dir.source.pug + '**/*.pug', pug2html);
  gulp.watch([
    config.dir.source.images + '**/*.{JPG,jpeg,JPEG,jpg,gif,png,svg,webp,webP}',
    '!' + config.dir.source.images +'sprite/*'
  ], imageMin);
  gulp.watch(config.dir.source.images + 'sprite/*', svgSpriteBuild);
  gulp.watch(config.dir.source.sass + '**/*.scss', scss2css);
  gulp.watch(config.dir.source.js + '*.js', scripts);
  gulp.watch(config.dir.source.blocks + '**/*.pug', pug2html);
  gulp.watch(config.dir.source.blocks + '**/*.scss', scss2css);
  gulp.watch(config.dir.source.blocks + '**/*.js', scripts);
  gulp.watch(config.dir.target.dist + '*.html').on('change',browserSync.reload);
}

function watchDev() {
  browserSync.init({
    server: {
      baseDir: config.dir.target.dist,
    }
  });
  gulp.watch(config.dir.source.pug + '**/*.pug', pug2html);
  gulp.watch([
    config.dir.source.images + '**/*.{JPG,jpeg,JPEG,jpg,gif,png,svg,webp,webP}',
    '!' + config.dir.source.images +'sprite/*'
  ], imageMove);
  gulp.watch(config.dir.source.images + 'sprite/*', svgSpriteBuild);
  gulp.watch(config.dir.source.sass + '**/*.scss', scss2css);
  gulp.watch(config.dir.source.js + '*.js', scripts);
  gulp.watch(config.dir.source.blocks + '**/*.pug', pug2html);
  gulp.watch(config.dir.source.blocks + '**/*.scss', scss2css);
  gulp.watch(config.dir.source.blocks + '**/*.js', scripts);
  gulp.watch(config.dir.target.dist + '*.html').on('change',browserSync.reload);
}

export default gulp.series(clean,fonts,pug2html,scss2css,imageMove,svgSpriteBuild,scripts,jsLibs,watchDev);

gulp.task('build', gulp.series(clean,fonts,pug2html,scss2css,imageMin,svgSpriteBuild,scripts,jsLibs,watch));