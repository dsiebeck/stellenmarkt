    /*jslint node: true */
    "use strict";


    module.exports = function(grunt) {
     
      grunt.initConfig({
        copy:{
               
             
             data:{
                cwd: 'app/',
                src:  'data/*' ,
                dest: 'dist/',
                nonull: true,
                expand: true 
             },
             
             index:{
                src:  'app/index-build.html' ,
                dest: 'dist/index.html',
                nonull: true,
             }
            },
        
        html2js: {
              options: {
                base: 'app',
                module: 'jobOfferApp.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                  collapseBooleanAttributes: true,
                  collapseWhitespace: true,
                  removeAttributeQuotes: true,
                  removeComments: true,
                  removeEmptyAttributes: true,
                  removeRedundantAttributes: true,
                  removeScriptTypeAttributes: true,
                  removeStyleLinkTypeAttributes: true
                }
              },
              main: {
                src: [ 'app/partials/*.html' ],
                dest: 'tmp/partials.js'
              }
            },
       
        clean: {
          temp: {
            src: [ 'tmp' ]
          },
          dist: {
            src: [ 'dist/*' ]
          }
        },
       
        concat: {
          options: {
            separator: ';'
          },
          
          js: {
            src: ['app/bower_components/angular/angular.min.js',
                  'app/bower_components/angular-route/angular-route.min.js', 
                  'app/bower_components/angular-resource/angular-resource.min.js',
                  'app/bower_components/angular-i18n/angular-locale_de-de.js',
                  'app/js/*.js', 
                  'tmp/*.js' ],
            dest: 'dist/jobOffers.js',
            nonull: true,
          },
          css: {
                src: ['app/css/app.css'],  
                dest: 'dist/jobOffers.css',
                nonull: true,
            
            }
        },
       
        jshint: {
          all: [ 'Gruntfile.js', 'app/js/*.js' ]
        },
       
        
        
        /*
        compress: {
          dist: {
            options: {
              archive: 'dist/stellenmarkt.zip'
            },
            
            files: [{
              src: [ 'index.html' ],
              dest: '/'
            }, {
              src: [ 'dist/**' ],
              dest: 'dist/'
            }, 
            ]
          }
        },
        */
        
      });
     
      //grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-copy');
      //grunt.loadNpmTasks('grunt-contrib-compress');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-html2js');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-bower-task');
     
      
      grunt.registerTask('build',['clean:dist','html2js', 'concat','copy','clean:temp']);
    };