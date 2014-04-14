module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean','html2js','concat','recess:build','copy:assets']);
    grunt.registerTask('release', ['clean','html2js','uglify','concat:index', 'recess:min','copy:assets']);


    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        banner:
            '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        src: {
            js: ['src/**/*.js', '<%= distdir %>/templates/**/*.js'],
            html: ['src/index.html'],
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                common: ['src/common/**/*.tpl.html']
            },
            less: ['src/less/bootstrap.less']
        },
        clean: ['<%= distdir %>/*'],
        copy: {
            assets: {
                files: [{ dest: '<%= distdir %>/assets', src : '**', expand: true, cwd: 'src/assets/' },
                    {expand: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: '<%= distdir %>/fonts/',
                        flatten: true}, 
                        {expand: true, src: ['bower_components/fontawesome/font/*'], dest: '<%= distdir %>/font/',
                        flatten: true},
                        {expand: true, src: ['bower_components/fontawesome/css/*'], dest: '<%= distdir %>/css/',
                        flatten: true}],
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },
        concat:{
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>'],
                dest:'<%= distdir %>/<%= pkg.name %>.js'
            },
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            },
            angular: {
                src:['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js'],
                dest: '<%= distdir %>/angular.js'
            },
            angularUi: {
                src:['bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-ui-utils/ui-utils.js',
                    'bower_components/angular-ui-map/ui-map.js'],
                dest: '<%= distdir %>/angular-ui.js'
            },
            jquery: {
                src:['bower_components/jquery/jquery.js'],
                dest: '<%= distdir %>/jquery.js'
            },
            bootstrap: {
                src:['bower_components/bootstrap/js/transition.js', 'bower_components/bootstrap/js/collapse.js'],
                dest: '<%= distdir %>/bootstrap.js'
            },
            jqueryUi: {
                src:['bower_components/jquery-ui/ui/jquery-ui.js'],
                dest: '<%= distdir %>/jquery-ui.js'
            }
        },
        uglify: {
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>'],
                dest:'<%= distdir %>/<%= pkg.name %>.js'
            },
            angular: {
                src:['<%= concat.angular.src %>'],
                dest: '<%= distdir %>/angular.js'
            },
            bootstrap: {
                src:['concat.bootstrap.src'],
                dest: '<%= distdir %>/bootstrap.js'
            },
            jquery: {
                src:['bower_components/jquery/jquery.js'],
                dest: '<%= distdir %>/jquery.js'
            }
        },
        recess: {
            build: {
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css':
                        ['<%= src.less %>', 'src/css/styles.css'] },
                options: {
                    compile: true
                }
            },
            min: {
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
                },
                options: {
                    compress: true
                }
            }
        }
    });

};
