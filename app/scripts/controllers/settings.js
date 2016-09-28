'use strict';

/**
 * @ngdoc function
 * @name twitterApiappApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the twitterApiappApp
 */
angular.module('twitterApiappApp')
  .controller('SettingsCtrl', function ($scope, dataFactory) {
    dataFactory.fetchUsers().then(function(response){
      //Get the preferences object stored in localstorage.
      var layoutStatus = JSON.parse(dataFactory.getLayoutStatus());
  	  if(layoutStatus == null || layoutStatus == undefined){
  	    dataFactory.setLayoutStatus(response.data);
  	    $scope.layoutStatus = response.data;
  	  }else{
  	  	//Set the layout preferences locally to render settings panel
  	    $scope.layoutStatus = layoutStatus;
  	  }
  	}).finally(function(){

  	})
  	//On click of save edited layout preferences will get saved in local storage
  	$scope.saveLayoutSettings = function(){
  		dataFactory.setLayoutStatus($scope.layoutStatus);
  	}

    $scope.$on("$destroy", function() {
        $scope.layoutStatus = null;
    });

  });
