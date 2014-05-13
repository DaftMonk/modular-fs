'use strict';

angular.module('ngApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });