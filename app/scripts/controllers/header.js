'use strict';

/**
 * @ngdoc function
 * @name twitterApiappApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the twitterApiappApp
 */
angular.module('twitterApiappApp')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.openSettingPage = function(){
      $location.path('/settings');
    }
    $scope.goBackHome = function(){
      $location.path('/');
    }
  });
