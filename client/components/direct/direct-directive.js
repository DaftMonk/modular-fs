'use strict';

angular.module('ngApp')
  .directive('direct', function () {
    return {
      templateUrl: 'components/direct/direct.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        element.text('this is the direct directive');
      }
    };
  });