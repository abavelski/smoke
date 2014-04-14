module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'copy:assets']);

    // Project configuration.
    grunt.initConfig({
        distdir: 'release',
        clean: ['<%= distdir %>/*'],
        copy: {
            assets: {
                files: [{ dest: '<%= distdir %>', src : '**', expand: true, cwd: 'server/' },
                    { dest: '<%= distdir %>/static', src : '**', expand: true, cwd: 'client/dist/' }]
            }
        }
    });
};
