module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-angular-gettext');

  grunt.initConfig({
    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': ['app/views/*.html']
        }
      },
    },
    
    nggettext_compile: {
      all: {
  	options: {
          module: 'app'
        },
        files: {
          'public/scripts/translations.js': ['po/*.po']
        }
      },
    },
  });

};