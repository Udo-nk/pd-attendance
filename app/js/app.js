"use strict";

var app = angular.module('pdAttendance',['lumx','ui.router']);

var viewsDir = "app/js/views/";
var templatesDir = "app/js/templates/";

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("login", {
      url: "/",
      templateUrl: viewsDir + "login.html",
      controller: 'LoginController'
    })
    .state("dashboard", {
      url: "/dashboard",
      templateUrl: viewsDir + "dashboard.html",
      controller: "DashboardController"
    })
    .state("statistics", {
      url: "/statistics",
      templateUrl: viewsDir + "statistics.html",
      controller: "StatisticsController"
    });

});