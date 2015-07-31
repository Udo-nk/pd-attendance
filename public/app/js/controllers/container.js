"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', '$cookies','LxDialogService', 'group', 'LxNotificationService',
  function($rootScope, $scope, $state, $cookies, LxDialogService, group, LxNotificationService){
   $scope.user = $cookies.getObject('user');
   $scope.$state = $state;
   $scope.groups = group.all();

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