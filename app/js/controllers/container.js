"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', '$cookies','LxDialogService','group',
  function($rootScope, $scope, $state, $cookies, LxDialogService, group){
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

   $scope.createGroup = function(groupName){
    if(groupName.length > 3){
      group.create(groupName, function(err){
        console.log(err);
      });
    }
   }

}])