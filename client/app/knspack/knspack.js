'use strict';

angular.module('knsapackApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/knspack', {
        templateUrl: 'app/knspack/knspack.html',
        controller: 'KnspackController',
        controllerAs: 'ws'
      });
  });
