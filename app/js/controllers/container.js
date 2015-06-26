"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', '$cookies','LxDialogService', 'group', 'LxNotificationService',
  function($rootScope, $scope, $state, $cookies, LxDialogService, group, LxNotificationService){
   $scope.view = { 'dashboard': true, 'statistics': false };

   $scope.setActive = function(view){
    var current = $state.current.url.substring(1);
    $scope.view = {};
    $scope.view[current] = true;
   };

   $scope.setActive();
   $scope.user = $cookies.getObject('user');

   $scope.openDialog = function(){
    LxDialogService.open('create-group');
   };

   group.all(function(groups){
    $scope.pdGroups = groups;
    console.log($scope.pdGroups);
   });

   var groupExists = function(group){
    var groups = $scope.pdGroups;
    for(var key in groups){
      if(groups.hasOwnProperty(key) && groups[key] == group){
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