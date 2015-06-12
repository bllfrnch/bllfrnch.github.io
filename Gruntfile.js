module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // requirejs: {
    //   compile: {
    //     options: {
    //       baseUrl: '.',
    //       paths: {
    //           jbone: 'js/add/jbone',
    //           reqwest: 'bower_components/reqwest/reqwest',
    //           modal: 'js/add/modal.abstract',
    //           hogan: 'bower_components/hogan/web/builds/3.0.2/hogan-3.0.2.amd',
    //           moment: 'bower_components/moment/moment',
    //           notification: 'js/add/modal.notification',
    //           autoinput: 'js/add/modal.auto-input',
    //           manualinput: 'js/add/modal.manual-input',
    //           parser: 'js/add/event.parser'
    //       },
    //       name: 'bower_components/almond/almond',
    //       include: ['js/add/main-src'],
    //       insertRequire: ['js/add/main-src'],
    //       wrap: {
    //           startFile: 'js/add/start.frag',
    //           endFile: 'js/add/end.frag'
    //       },
    //       optimize: 'none',
    //       out: 'js/add/main.js'
    //     } 
    //   }
    // },
    jshint: {
      all: ['js/add/modal*.js'],
      options: {
        debug: true
      }
    },
    watch: {
      files: ['Gruntfile.js', 'js/**.js', 'css/scss/**/*.scss'],
      tasks: ['jshint', 'compass:dev']
    },
    compass: {
      dist: {
        options: {
          sassDir: 'css/scss',
          cssDir: 'css',
          importPath: 'css/scss',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'css/scss',
          importPath: 'css/scss',
          cssDir: 'css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jshint', 'compass']);
};