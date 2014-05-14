'use strict'

angular.module('ngApp').config ($routeProvider) ->
  $routeProvider.when '/',
    templateUrl: 'app/main/main.html'
    controller: 'MainCtrl'