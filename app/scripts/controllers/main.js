'use strict';

/**
 * @ngdoc function
 * @name twitterApiappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twitterApiappApp
 */
angular.module('twitterApiappApp')
  .controller('MainCtrl', function ($scope, dataFactory) {
  	var layoutObject = {};
    dataFactory.fetchUsers().then(function(response){
      var layoutStatus = JSON.parse(dataFactory.getLayoutStatus());
      if(layoutStatus == null || layoutStatus == undefined){
        dataFactory.setLayoutStatus(response.data);
        layoutObject = response.data;
        $scope.twitter_users = response.data.users;
        $scope.displayCount = response.data.displayCount;
        fetchTwitterTimeLines();
        return;
      }
      if(response.data.users.length > layoutStatus.users.length){
        dataFactory.setLayoutStatus(response.data);
        layoutObject = response.data;
  		  $scope.twitter_users = response.data.users;
        $scope.displayCount = response.data.displayCount;
      }else{
        layoutObject = layoutStatus;
        $scope.twitter_users = layoutStatus.users;
        $scope.displayCount = layoutStatus.displayCount;
      }
      fetchTwitterTimeLines();
  	}).finally(function(){

  	})

    function fetchTwitterTimeLines(){
      for(var i = 0; i < $scope.twitter_users.length; i++){
        dataFactory.fetchTwitterTimeline($scope.twitter_users[i].userName, i).then(function(response){
          $scope.twitter_users[response.data.callIndex].user_timeline = response.data;
          $scope.twitter_users[response.data.callIndex].timeLineStatus = 1;
        },function(error){
          $scope.twitter_users[error.callIndex].timeLineStatus = 2;
        }).finally(function(){

        })
      }
    } 

    $scope.onMoved = function(obj, index){
    	console.log('Index: ', index);
      obj.splice(index, 1);
      updateLocalStorage();
    }

    function updateLocalStorage(){
      layoutObject.users = angular.copy($scope.twitter_users);
      angular.forEach(layoutObject.users, function(value, key) {
        value.user_timeline = null;
      });
      dataFactory.setLayoutStatus(layoutObject);
    }

  });