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
  grunt.registerTask('serve', ['clean', 'assemble:dev', 'copy:dev', 'connect', 'watch']);
};
