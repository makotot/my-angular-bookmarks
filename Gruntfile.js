module.exports = function (grunt) {

  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    path: {
      src: './src',
      dev: './dev',
      dest: './build'
    },
    clean: {
      dev: {
        src: ['<%= path.dev %>']
      },
      build: {
        src: ['<%= path.dest %>']
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            src: ['<%= path.src %>/json/*.json'],
            dest: '<%= path.dev %>/json',
            flatten: true
          },
          {
            expand: true,
            src: ['<%= path.src %>/js/*.js'],
            dest: '<%= path.dev %>/js',
            flatten: true
          },
          {
            expand: true,
            src: ['./bower_components/normalize-css/normalize.css'],
            dest: '<%= path.dev %>/css/lib',
            flatten: true
          }
        ]
      }
    },
    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: ['<%= path.src %>/partials/*.hbs']
      },
      dev: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages/',
            src: '*.hbs',
            dest: '<%= path.dev %>'
          },
          {
            options: {
              layout: 'views/default.hbs'
            },
            expand: true,
            cwd: '<%= path.src %>/views/',
            src: '*.hbs',
            dest: '<%= path.dev %>/views'
          }
        ]
      },
      build: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages/',
            src: '*.hbs',
            dest: '<%= path.dest %>'
          }
        ]
      }
    },
    sass: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss/',
            src: '*.scss',
            dest: '<%= path.dev %>/css/',
            ext: '.css'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['copy:dev'],
        options: {
          spawn: false
        }
      },
      json: {
        files: ['src/json/*.json'],
        tasks: ['copy:dev'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '<%= path.dev %>',
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'assemble']);
  grunt.registerTask('serve', ['clean', 'assemble:dev', 'sass:dev', 'copy:dev', 'connect', 'watch']);
};
