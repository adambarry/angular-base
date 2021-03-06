/*******************************************************************************
Use Grunt to process JavaScript and LESS files

Inspiration:
http://justinklemm.com/grunt-watch-livereload-javascript-less-sass-compilation/


How to use (if you already have nodejs and Grunt installed, skip to step 3):

1)  Install Node.js (with Node Package Manager/NPM) from
    http://nodejs.org/download/

2)  Install Grunt (globally):
    sudo npm install -g grunt-cli

3)  Open a terminal window, "cd" into the project folder and type:
    npm install

    This will install Node.js in the project folder; perform an initial
    compilation of the files that Grunt are monitoring; and start a Grunt watch
    task (which you can cancel by typing "ctrl c").

4)  If you cancel the Grunt watch task, you can restart it by typing:
    grunt watch

*******************************************************************************/

module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';\r\n', //append a ";" + return + newline after each source script
            },
            dist: {
                src: [
                    //Angular and dependencies
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-http-batcher/dist/angular-http-batch.min.js',

                    'bower_components/messageformat/messageformat.js',
                    'bower_components/angular-translate/angular-translate.min.js',
                    'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min.js',

                    'bower_components/lodash/dist/lodash.min.js',
                    'bower_components/restangular/dist/restangular.min.js',

                    //Various frameworks
                    'bower_components/modernizr/modernizr.js',

                    //Plugins (in specifc order)
                    'scripts/plugins/session.js',
                    'scripts/plugins/console.js',

                    //App specific JavaScripts
                    'ng/**/*.js',

                    //Angular HTML templates
                    '<%= ngtemplates.app.dest %>'
                ],
                dest: 'compiled/all.js',
            },
        },
        less: {
            style: {
                files: {
                    "compiled/styles.css": "styles/manifest.less" //Process the manifest "styles/manifest.less" and output to "compiled/styles.css"
                }
            }
        },
        watch: {
            scripts: {
                files: ['scripts/plugins/**/*.js', 'ng/**/*.js'],
                tasks: ['concat'],
                options: {
                    atBegin: true,
                    atBegin: true
                }
            },
            css: {
                files: [
                    '**/*.less',
                    '**/*.css'
                ],
                tasks: ['less:style'],
                options: {
                    atBegin: true,
                    livereload: true
                }
            },
            html: {
                files: [
                    '*.html',
                    'ng/**/*.html'
                ],
                tasks: ['ngtemplates'],
                options: {
                    atBegin: true,
                    livereload: true
                }
            },
            livereload: {
                options: { livereload: true },
                files: [
                    '**/*.html'
                ]
            }
        },
        ngtemplates: {
            app: {
                //cwd: 'www',
                src: 'ng/**/*.html',
                dest: 'compiled/templates.js',
                options: {
                    module: 'App',
                    prefix: '/',
                    // htmlmin: {
                    //     collapseBooleanAttributes:      true,
                    //     collapseWhitespace:             true,
                    //     removeAttributeQuotes:          true,
                    //     removeComments:                 true, // Only if you don't use comment directives! 
                    //     removeEmptyAttributes:          true,
                    //     removeRedundantAttributes:      true,
                    //     removeScriptTypeAttributes:     true,
                    //     removeStyleLinkTypeAttributes:  true
                    // }
                }
            }
        }
    });

    // grunt.event.on('watch', function(action, filepath, target) {
    //     grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    // });


    ////////////////////////////////////////////////////////////////////////////////
    //: Register tasks
    ////////////////////////////////////////////////////////////////////////////////

    // Init
    // Execute an initial compilation of the JavaScript and LESS/CSS files
    //
    // Used when executing an "npm install" e.g. from the terminal

    grunt.registerTask('init', [
        'less:style',
        'concat'
    ]);


    // Watch
    // Compile the JavaScript and LESS/CSS files when saving the files and
    // livereload connected browsers

    grunt.registerTask('watch', [
        'watch'
    ]);


    ////////////////////////////////////////////////////////////////////////////////
    //: Load dependencies
    ////////////////////////////////////////////////////////////////////////////////

    //grunt.loadNpmTasks('grunt-manifest-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
};