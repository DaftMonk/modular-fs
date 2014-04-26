'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'components/signup/signup.html',
        controller: 'SignupCtrl'
      });
  });
