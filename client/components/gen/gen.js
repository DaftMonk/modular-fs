'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/gen', {
        templateUrl: 'components/gen/gen.html',
        controller: 'GenCtrl'
      });
  });
