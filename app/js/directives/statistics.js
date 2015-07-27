directive.directive('statistics', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/statistics.html',
    controller: ['$scope', 'LxDialogService', 'LxNotificationService',
    function($scope, LxDialogService, LxNotificationService){
      $scope.view = { 'dashboard': true, 'statistics': false };
    }]
  };
});
