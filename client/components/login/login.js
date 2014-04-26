'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl'
      });
  });