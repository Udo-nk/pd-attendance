"use strict";

appCtrl.controller('ContainerController', ['$rootScope', '$scope', '$state', 
  function($rootScope, $scope, $state){
   $scope.view = { 'dashboard': true, 'statistics': false };

   $scope.setActive = function(view){
    var current = $state.current.url.substring(1);
    $scope.view = {};
    $scope.view[current] = true;
   };
   $scope.setActive();

   
}])