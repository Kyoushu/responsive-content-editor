module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build']
            },
            test: {
                files: ['src/**/*.js', 'tests/tests.js'],
                tasks: ['build:test']
            }
        },

        concat: {
            dist: {
                src: [
                    'src/RCE/main.js',
                    'src/RCE/Views/View.js',
                    'src/**/*.js'
                ],
                dest: 'dist/rce.js'
            }
        },

        copy: {
            main: {
                files: [
                    {src: 'bower_components/jquery/dist/jquery.js', dest: 'tests/jquery.js'},
                    {src: 'bower_components/qunit/qunit/qunit.js', dest: 'tests/qunit.js'},
                    {src: 'bower_components/qunit/qunit/qunit.css', dest: 'tests/qunit.css'},
                    {src: 'dist/rce.js', dest: 'tests/rce.js'}
                ]
            }
        },

        uglify: {
            build: {
                src: 'dist/rce.js',
                dest: 'dist/rce.min.js'
            }
        },

        qunit: {
            files: ['tests/tests.html']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('build:test', ['build', 'copy', 'qunit']);
    grunt.registerTask('test', ['build:test', 'watch:test']);
    grunt.registerTask('default', ['build', 'watch:scripts']);

};