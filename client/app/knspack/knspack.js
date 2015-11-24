'use strict';

angular.module('knsapackApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/knspack/knspack.html',
        controller: 'KnspackController',
        controllerAs: 'ws'
      });
  });
