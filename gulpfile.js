'use strict';

var

// Node Modules
gulp = require('gulp'),
jade = require('gulp-jade'),
sass = require('gulp-sass'),
autoprefixer = require( 'gulp-autoprefixer' ),
cssmin = require( 'gulp-minify-css' ),
plumber = require( 'gulp-plumber' ),
concat = require('gulp-concat'),
pretty = require('gulp-html-prettify'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
connect = require('gulp-connect'),
open = require('gulp-open'),
watch = require('gulp-watch'),
model = require('./dev/theme.json'),

// File Paths
paths = {
  allJade: './dev/jade/**/*.jade',
  jade: './dev/jade/theme.jade',
  allSass: './dev/scss/**/*.scss',
  sass: './dev/scss/theme.scss',
  allJs: './dev/js/*.js',
  allJsLib: './dev/js/lib/**/*.js',
  js: './dev/js/theme.js',
  theme: './theme',
  assets: './theme/assets'

};



 //    _             _       
 //   (_)           | |      
 //    _   __ _   __| |  ___ 
 //   | | / _` | / _` | / _ \
 //   | || (_| || (_| ||  __/
 //   | | \__,_| \__,_| \___|
 //  _/ |                    
 // |__/                     
 //

gulp.task( 'jade', function() {
  gulp.src( paths.jade )
    .pipe( plumber())
    .pipe( jade( { locals: model, pretty: true } ) )
    .pipe( pretty( {indent_size: 2} ) )
    .pipe( gulp.dest( paths.theme ) )
    .pipe( plumber.stop())
    .pipe( connect.reload() );
});



 //  ___   __ _  ___  ___ 
 // / __| / _` |/ __|/ __|
 // \__ \| (_| |\__ \\__ \
 // |___/ \__,_||___/|___/
 //

gulp.task( 'sass', function() {
  gulp.src( paths.sass )
    .pipe( plumber())
    .pipe( sass() )
    .pipe( autoprefixer() )
    .pipe( cssmin({keepSpecialComments:true}) )
    .pipe( gulp.dest( paths.assets ) )
    .pipe( plumber.stop())
    .pipe( connect.reload() );
});



 //    _                                _       _   
 //   (_)                              (_)     | |  
 //    _  __ ___   ____ _ ___  ___ _ __ _ _ __ | |_ 
 //   | |/ _` \ \ / / _` / __|/ __| '__| | '_ \| __|
 //   | | (_| |\ V / (_| \__ \ (__| |  | | |_) | |_ 
 //   | |\__,_| \_/ \__,_|___/\___|_|  |_| .__/ \__|
 //  _/ |                                | |        
 // |__/                                 |_|        

gulp.task( 'javascript', function() {
  gulp.src( paths.allJs )
    .pipe( plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe( concat('theme.js') )
    .pipe(uglify())
    .pipe( gulp.dest( paths.assets ) )
    .pipe( plumber.stop())
    .pipe( connect.reload() );

  gulp.src( paths.allJsLib )
    .pipe( plumber())
    .pipe( concat('libraries.js') )
    .pipe(uglify())
    .pipe( gulp.dest( paths.assets ) )
    .pipe( plumber.stop())
    .pipe( connect.reload() );


});



 //  ___   ___  _ __ __   __ ___  _ __ 
 // / __| / _ \| '__|\ \ / // _ \| '__|
 // \__ \|  __/| |    \ V /|  __/| |   
 // |___/ \___||_|     \_/  \___||_|   
 //
        
 // Create server                            
gulp.task( 'connect', function() {
  connect.server({
    root: paths.theme,
    livereload: true
  });
});

 // Watch Files
gulp.task( 'watch', function () {
  gulp.watch( paths.allJade, ['jade'] );
  gulp.watch( paths.allSass, ['sass'] );
  gulp.watch( paths.allJs, ['javascript'] );
});

 // Open Browser
gulp.task('open', function(){
  gulp.src( './theme/theme.html' )
  .pipe( open( '', { url: 'http://localhost:8080' } ) );
});



 //      _         __               _  _   
 //     | |       / _|             | || |  
 //   __| |  ___ | |_  __ _  _   _ | || |_ 
 //  / _` | / _ \|  _|/ _` || | | || || __|
 // | (_| ||  __/| | | (_| || |_| || || |_ 
 //  \__,_| \___||_|  \__,_| \__,_||_| \__|
 //

gulp.task( 'default', [ 'jade', 'sass', 'javascript', 'connect', 'watch', 'open' ] );