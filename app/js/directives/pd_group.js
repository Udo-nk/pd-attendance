var directive = angular.module('pdAttendance.directives', []);

directive.directive('pdGroup', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/pd_group.html',
    controller : function($scope){
      
      $scope.deleteGroup = function(groupid){
        console.log(groupid);
      };

    }
  }
});

directive.directive('dashboard', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/dashboard.html'
  };
});