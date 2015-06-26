"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', '$cookies','LxDialogService', 'group', 'LxNotificationService',
  function($rootScope, $scope, $state, $cookies, LxDialogService, group, LxNotificationService){
   $scope.view = { 'dashboard': true, 'statistics': false };

   $scope.user = $cookies.getObject('user');

   $scope.groups = group.all();

   $scope.openDialog = function(){
    LxDialogService.open('create-group');
   };

   var groupExists = function(group){
    var groups = $scope.groups;
    for(var key in groups){
      if(groups.hasOwnProperty(key) && groups[key].name == group){
        return true;
      }
    }
    return false;
   };

   $scope.createGroup = function(name){
    var groupName = name.toLowerCase();
    if(groupExists(groupName)){
      LxDialogService.close('create-group');
      LxNotificationService.warning("The PD group " + groupName + " already exists");
    }
    else if(groupName.length > 3){
      group.create(groupName, function(err){
        if(!err){
          LxDialogService.close('create-group');
          LxNotificationService.success("PD group " + groupName + " has been created");
        }
      });
    }
   };

}])