'use strict';

angular.module('ngApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl'
      });
  });
