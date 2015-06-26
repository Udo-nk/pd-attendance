"use strict";

var appCtrl = angular.module('pdAttendance.controllers', []);

appCtrl.controller('LoginController', ['$rootScope', '$scope', 'Authentication', '$state', '$cookies',
  function($rootScope, $scope, Authentication, $state, $cookies){

  $scope.login = function(){
    Authentication.login(function(err, data){
      if(!err){
        $cookies.putObject('user', Authentication.buildUserObjectFromGoogle(data));
        $state.go('admin.dashboard');
      } else {
        alert('login failed');
      }
    });
  };


}]);