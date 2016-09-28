'use strict';

/**
 * @ngdoc service
 * @name twitterApiappApp.dataFactory
 * @description
 * # dataFactory
 * Factory in the twitterApiappApp.
 */
angular.module('twitterApiappApp')
  .factory('dataFactory', function ($http) {
    // Service logic
    // ...

    // Public API here
    return {
      setLayoutStatus: function(currentLayout){
        if (typeof(Storage) !== 'undefined') {
          // Code for localStorage/sessionStorage.
          localStorage.setItem('layoutStatus', JSON.stringify(currentLayout));
        } else {
            // Sorry! No Web Storage support..
            alert('Sorry! No Web Storage support..');
        }
      },
      getLayoutStatus: function(){
        var layoutObject = localStorage.getItem('layoutStatus');
        return layoutObject;
      },
      fetchUsers: function () {
         return $http({
          method: 'GET',
          url: '/json/twitter_users.json',
          cache: false
        })
      },
      fetchTwitterTimeline: function (user, index) {
        var callIndex = index;
         return $http({
          method: 'GET',
          url: '/json/'+user+'.json',
          cache: false
        }).success(function (response)  {
            response.callIndex = callIndex;
            return response;
        }).error(function (error)   {
           console.log('XHR Failed for getting assigned Season Details. ' + error);
           error.callIndex = callIndex;
        });
      }
    };
  });