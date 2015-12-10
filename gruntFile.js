module.exports = function(grunt) {

    var fs = require('fs');
    var exec = require('child_process').exec;
    require('rootpath')();

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        jsonStore: {
            path: 'lib/data/store.json',
            clean: true
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['lib/mockdb.js',
                    'test/specs/*.spec.js']
        },
        test: {
            specs: 'test/specs/'
        }
    });

    grunt.registerTask('jsonStore:clean', 'Clean jsonStore data file.', function() {
        var jsonStore = grunt.config('jsonStore.path');
        var clean = grunt.config('jsonStore.clean');

        if (clean) {
            fs.writeFileSync(jsonStore, '{}', 'utf8');
        }

        grunt.log.writeln('Currently running the "jsonStore:clean" task.');
    });

    grunt.registerTask('mockTest', 'Test Mock JSON API Web.', function() {
        var done = this.async();
        var specs = grunt.config('test.specs');

        exec("jasmine-node-karma "+specs+" --verbose", function(error, stdout, stderr){
            if (error){
                grunt.log.writeln(error);
            }
            if (stderr) {
                grunt.log.writeln(stderr);
            }
            grunt.log.writeln(stdout);
            done(true);
        });

        grunt.log.writeln('Currently running the "mockJsonApiWeb:test" task.');
    });

    grunt.registerTask('default', 'Test mock-json-api-web project.', function() {
        grunt.task.run(['jshint', 'jsonStore:clean', 'mockTest']);
        grunt.log.writeln('Currently running the "default" task.');
    });

};