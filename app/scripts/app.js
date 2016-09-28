'use strict';

/**
 * @ngdoc overview
 * @name twitterApiappApp
 * @description
 * # twitterApiappApp
 *
 * Main module of the application.
 */
angular
  .module('twitterApiappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'dndLists'
  ]).run(function ($rootScope, $location) {
      $rootScope.$on('$locationChangeSuccess', function () {
          $rootScope.currentLocation = $location.path();
      }); 
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/settings',{
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
