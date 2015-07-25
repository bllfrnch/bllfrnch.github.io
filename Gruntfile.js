module.exports = function(grunt) {
  var config = {
    scssLib: [
      'bower_components/bourbon/app/assets/stylesheets/**/*.scss',
      'bower_components/bitters/app/assets/stylesheets/**/*.scss',
      'bower_components/neat/app/assets/stylesheets/**/*.scss'
    ]
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options : {
        nospawn : true
      },
      main: {
        files: config.scssLib.concat(['Gruntfile.js', 'css/scss/**/*.scss']),
        tasks: ['sass', 'critical:atf']
      }
    },

    critical: {
      atf: {
        base: './',
        src: 'index.html',
        dest: 'index.html',
        width: 1300,
        height: 900
      }
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'css/style.css': 'css/scss/style.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-critical');

  grunt.registerTask('default', ['watch']);
};
