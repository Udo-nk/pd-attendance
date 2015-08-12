"use strict";

var appCtrl = angular.module('pdAttendance.controllers', []);

appCtrl.controller('LoginController', ['$rootScope', '$scope', 'Authentication', '$state', '$cookies', 'Refs', 'LxNotificationService',
  function($rootScope, $scope, Authentication, $state, $cookies, Refs, LxNotificationService){

  $scope.login = function(){
    Authentication.login(function(err, data){
      if(!err){
        var userObject = Authentication.buildUserObjectFromGoogle(data);
        Authentication.isAdmin(userObject.email, function(admin){
          if(admin){
            $cookies.putObject('user', userObject); 
            $state.go('dashboard');
            LxNotificationService.success("Hi " + userObject.name + ", This UI interfaces with the PD Bot.");
          } else {
            LxNotificationService.error('Authorized persons only ¯\\_(ツ)_/¯');
          }
        });        
      } else {
        LxNotificationService.error('Login failed. Try again...(ツ)');
      }
    });
  };
}]);