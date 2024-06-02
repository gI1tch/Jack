const
    {src, dest, watch, parallel, series}    = require('gulp'),
    scss                                    = require('gulp-sass')(require('sass')), 
    concat                                  = require('gulp-concat'), 
    sync                                    = require('browser-sync').create(), 
    uglify                                  = require('gulp-uglify-es').default, 
    autoprefixer                            = require('gulp-autoprefixer'), 
    imagemin                                = require('gulp-imagemin'), 
    del                                     = require('del')
    
function browser() {
    sync.init({
     
        server: {
           baseDir: 'app/' 
        },
        notify: false
        
    }) 
}

function cleanDist(){
    return del('dist')
}

function images() {
    return src('app/img/**/*')

    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

function styles(){ 
    return src('app/scss/**.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({ 
            grid: true, 
            overrideBrowserslist: ['last 10 version']
        }))
        .pipe(dest('app/css'))
        .pipe(sync.stream())
}
function scripts(){
    return src([
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(sync.stream())

}

function build() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js', 
        'app/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching(){ 
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.html']).on('change', sync.reload)
}

exports.styles      = styles
exports.watching    = watching
exports.browser     = browser
exports.scripts     = scripts
exports.images      = images
exports.cleanDist   = cleanDist


exports.build       = series(cleanDist, images, build)
exports.default     = parallel(scripts ,browser, watching) 