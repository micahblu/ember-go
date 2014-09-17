module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    
    sass: {
      dist: {
        options: {
          style: 'compact'
        },
        files: {
          'build/assets/stylesheets/app.css': 'src/sass/app.scss'
        }
      }
    },

    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /src\/js\/app\/templates\//
        },
        files: {
          'src/js/templates.js': 'src/js/app/templates/**/*.hbs'
        }
      }
    },
    
    concat: {
      app: {
        src: ['bower_components/jquery/jquery.js',
              'bower_components/handlebars/handlebars.js',
              'bower_components/ember/ember.js',
              'src/app/templates.js',
              'src/app/init.js',
              'src/app/router.js',
              'src/app/**/*.js'],

        dest: 'build/assets/js/app.js'
      }
    },

    qunit: {
        all: {
            options: {
                urls: [
                    'http://localhost/[YOUR_PATH_HERE]/test/index.html'
                ]
            }
        }
    },

    jshint: {
        src: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['src/js/app/**/*.js']
        }
    },
    
    watch: {
      sass: {
        files: 'src/sass/*.scss',
        tasks: ['sass']
      }, 
      emberTemplates: {
        files: 'src/js/app/templates/**/*.hbs',
        tasks: ['emberTemplates']
      }, 
      concat: {
        files: ['src/js/**/*.js', '!src/js/app.js', '!src/js/libs.js', '!src/js/templates.js'],
        tasks: ['concat']
      },

      qunit: {
        files: ['src/js/app/**/*.js'],
        tasks: ['connect', 'qunit']
      },

      jshint: {
        files: ['src/js/app/**/*.js'],
        tasks: ['jshint']
      },

      index: {
        files: 'src/index.html',
        tasks: ['copy:build']
      }
    },

    copy: {
      build: {
        src: 'src/index.html',
        dest: 'build/index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'emberTemplates', 'concat', 'copy', 'watch']);
};
