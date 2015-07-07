"use strict";

var appCtrl = angular.module('pdAttendance.controllers', []);

appCtrl.controller('LoginController', ['$rootScope', '$scope', 'Authentication', '$state', '$cookies', 'Refs',
  function($rootScope, $scope, Authentication, $state, $cookies, Refs){

  $scope.login = function(){
    Authentication.login(function(err, data){
      if(!err){
        $cookies.putObject('user', Authentication.buildUserObjectFromGoogle(data));
        $state.go('admin');
      } else {
        alert('login failed');
      }
    });
  };
}]);