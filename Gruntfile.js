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
        src: ['src/js/libs/jquery-1.10.2.js',
              'src/js/libs/handlebars-1.1.2.js',
              'src/js/libs/ember-1.3.1.js',
              'src/js/libs/ember-data-1.0.0-beta.7.js',
              'src/js/templates.js',
              'src/js/app/*.js', 
              'src/js/app/models/*.js', 
              'src/js/app/**/*.js'],

        dest: 'build/assets/js/app.js'
      }
    },

    qunit: {
        all: {
            options: {
                urls: [
                    'http://localhost:9000/test/index.html'
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

  // Default task(s).
  grunt.registerTask('default', ['sass', 'emberTemplates', 'concat', 'watch']);
};
