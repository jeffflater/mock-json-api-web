module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['src/*.js']
        }
    });

    grunt.registerTask('default', 'Test mock-json-api-web project.', function() {
        grunt.task.run(['jshint']);
        grunt.log.writeln('Currently running the "default" task.');
    });

};