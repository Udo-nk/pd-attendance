var directive = angular.module('pdAttendance.directives', []);

directive.directive('pdGroup', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/pd_group.html',
    controller: ['$scope', 'LxNotificationService', 'group', 
    function($scope, LxNotificationService, group){

      $scope.deleteGroup = function(){
        LxNotificationService.confirm('Delete ' + $scope.pdgroup.name + ' PD group?' , 'This action cannot be undone, click yes if you still want to continue', { cancel:'Yes delete', ok:'Not today' }, function(answer){
            !answer ? group.delete($scope.pdgroup.$id) : console.log('cancel');
        });
      };

    }] 
  }
});

directive.directive('dashboard', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/dashboard.html'
  };
});