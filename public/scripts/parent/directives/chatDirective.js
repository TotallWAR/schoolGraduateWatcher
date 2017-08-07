'use strict';

/* Directives */


angular.module('chatDirectives', [])
    .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
