"use strict";

var app = angular.module('pdAttendance',[
  'ngCookies',
  'lumx',
  'ui.router',
  'pdAttendance.controllers',
  'pdAttendance.services',
  'pdAttendance.directives',
  'firebase'
  ]);

var viewsDir = "app/js/views/";
var templatesDir = "app/js/templates/";

/**
 * Enable HTML5 mode
 */
app.config(['$locationProvider', function($locationProvider){
  //$locationProvider.html5Mode(true);
}]);

/**
 * Create routes
 */
app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("login", {
      url: "/",
      templateUrl: viewsDir + "login.html",
      controller: "LoginController"
    })
    .state("dashboard", {
      url: "/admin/dashboard",
      templateUrl: viewsDir + "container.html",
      controller: "ContainerController"
    })
    .state("statistics", {
      url: "/admin/statistics",
      templateUrl: viewsDir + "container.html",
      controller: "ContainerController"
    });
});