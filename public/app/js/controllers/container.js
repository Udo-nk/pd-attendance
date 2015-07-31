"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', '$cookies','LxDialogService', 'group', 'LxNotificationService', '$location',
  function($rootScope, $scope, $state, $cookies, LxDialogService, group, LxNotificationService, $location){
   $scope.user = $cookies.getObject('user');
   $scope.$state = $state;
   $scope.groups = group.all();
   $scope.activeTab = {};

   $scope.setActiveTab = function() {
    var path = $location.$$path.split('/');
    $scope.activeTab[path[2]] = true;
   };

   $scope.setActiveTab();

   $scope.groupExists = function(group){
    var groups = $scope.groups;
    for(var key in groups){
      if(groups.hasOwnProperty(key) && groups[key].name == group){
        return true;
      }
    }
    return false;
  };

  $scope.logout = function(){
    $cookies.remove('user');
    $state.go('login');
  };
}])