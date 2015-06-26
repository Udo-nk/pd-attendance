"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', '$cookies','LxDialogService', 'group', 'LxNotificationService',
  function($rootScope, $scope, $state, $cookies, LxDialogService, group, LxNotificationService){
   $scope.view = { 'dashboard': true, 'statistics': false };

   $scope.user = $cookies.getObject('user');

   $scope.groups = group.all();

}])