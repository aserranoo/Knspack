'use strict';

angular.module('knsapackApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/s', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
