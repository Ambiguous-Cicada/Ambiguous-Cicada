 module.exports = function(grunt) { 

  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      single: {
        singleRun: true,
      }
    }
  });

  grunt.registerTask('test', ['karma:single']);

};