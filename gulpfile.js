// Load gulp
var gulp = require('gulp');
var tasks = require('./gulp-tasks');
var dest = require('gulp-dest');

// Define paths
var paths = {
    src: {
        longashestypesass: {
            site: [
              'app/src/site_sass/templatetypes/longashes/**/*.scss',
            ]
        },
        longashessass: {
            site: [
                'app/src/site_sass/sites/longashes/**/*.scss'
            ]
        },
        gamekeeperssass: {
            site: [
                'app/src/site_sass/sites/gamekeepers/**/*.scss'
            ]
        },
        roydonsass: {
            site: [
                'app/src/site_sass/sites/roydon/**/*.scss'
            ]
        },
        tattenhallsass: {
            site: [
                'app/src/site_sass/sites/tattenhall/**/*.scss'
            ]
        },
        greathaywoodsass: {
            site: [
                'app/src/site_sass/sites/greathaywood/**/*.scss'
            ]
        },
        bellavistasass: {
            site: [
                'app/src/site_sass/sites/bellavista/**/*.scss'
            ]
        },
        deganwysass: {
            site: [
                'app/src/site_sass/sites/deganwy/**/*.scss'
            ]
        },
        sauljunctionsass: {
            site: [
                'app/src/site_sass/sites/sauljunction/**/*.scss'
            ]
        },
        boatsalessass: {
            site: [
                'app/src/site_sass/sites/boatsales/**/*.scss'
            ]
        },
        hungerfordsass: {
            site: [
                'app/src/site_sass/sites/hungerford/**/*.scss'
            ]
        },
        js: {
            site: [
                'app/src/site_js/jquery.js',
                'app/src/site_js/throttle-debounce.js',
                'app/src/site_js/jquery.swipebox.js',
                'app/src/site_js/jquery.infiniteScroll.js',
                'app/src/site_js/jquery.imageGallery.js',
                'app/src/site_js/slick.js',
                'app/src/site_js/components/*.js',
                'app/src/site_js/lazysizes.min.js',
                'app/src/site_js/site/*.js'
            ]
        },
        svg: {
            sass: 'app/src/site_sass/icons',
            site: [
                'app/src/site_svg/**/*.svg'
            ]
        },
    },
    dest: {
        js: 'web/assets/js/',
        longashes: 'web/assets/css/longAshesPark/',
        gamekeepers: 'web/assets/css/gamekeepersInn/',
        longashestype: 'web/assets/css/templatetypes/longashes/',
        tattenhall: 'web/assets/css/tattenhallMarina/',
        greathaywood: 'web/assets/css/greatHaywoodMarina/',
        bellavista: 'web/assets/css/laBellaVista/',
        roydon: 'web/assets/css/roydonMarinaVillage/',
        deganwy: 'web/assets/css/deganwyMarina/',
        sauljunction: 'web/assets/css/saulJunctionMarina/',
        boatsales: 'web/assets/css/boatSales/',
        hungerford: 'web/assets/css/hungerfordMarina/'
    }
};

global.paths = paths;

Object.keys(tasks).forEach(function (name) {
    gulp.task(name, tasks[name]);
});

gulp.task('longashes-css', ['build-longashes-sass']);
gulp.task('gamekeepers-css', ['build-gamekeepers-sass']);
gulp.task('longashestype-css', ['build-longashestype-sass']);
gulp.task('tattenhall-css', ['build-tattenhall-sass']);
gulp.task('greathaywood-css', ['build-greathaywood-sass']);
gulp.task('bellavista-css', ['build-bellavista-sass']);
gulp.task('deganwy-css', ['build-deganwy-sass']);
gulp.task('sauljunction-css', ['build-sauljunction-sass']);
gulp.task('boatsales-css', ['build-boatsales-sass']);
gulp.task('hungerford-css', ['build-hungerford-sass']);
gulp.task('roydon-css', ['build-roydon-sass']);
gulp.task('js', ['build-scripts-site']);
gulp.task('svg', ['build-svg','css-postsvg']);
gulp.task('css-postsvg', ['build-svg'], function() {
    gulp.start('longashes-css');
    gulp.start('gamekeepers-css');
    gulp.start('longashestype-css');
    gulp.start('tattenhall-css');
    gulp.start('greathaywood-css');
    gulp.start('bellavista-css');
    gulp.start('deganwy-css');
    gulp.start('sauljunction-css');
    gulp.start('boatsales-css');
    gulp.start('hungerford-css');
    gulp.start('roydon-css');
});

gulp.task('build', function () {
    gulp.start('svg','js');
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.src.svg.site, ['svg']);
    gulp.watch(paths.src.longashessass.site, ['longashes-css']);
    gulp.watch(paths.src.gamekeeperssass.site, ['gamekeepers-css']);
    gulp.watch(paths.src.longashestypesass.site, ['longashestype-css']);
    gulp.watch(paths.src.tattenhallsass.site, ['tattenhall-css']);
    gulp.watch(paths.src.greathaywoodsass.site, ['greathaywood-css']);
    gulp.watch(paths.src.bellavistasass.site, ['bellavista-css']);
    gulp.watch(paths.src.deganwysass.site, ['deganwy-css']);
    gulp.watch(paths.src.sauljunctionsass.site, ['sauljunction-css']);
    gulp.watch(paths.src.boatsalessass.site, ['boatsales-css']);
    gulp.watch(paths.src.hungerfordsass.site, ['hungerford-css']);
    gulp.watch(paths.src.roydonsass.site, ['roydon-css']);
    gulp.watch(paths.src.js.site, ['js']);
});


// Set the default task when you run gulp, first clean, then normal functions
gulp.task('default', function () {
    gulp.start('build', 'watch');
});
