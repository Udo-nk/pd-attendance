directive.directive('statistics', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/statistics.html',
    controller: ['$scope', 'statistics', 'LxDialogService', 'LxNotificationService',
    function($scope, statistics, LxDialogService, LxNotificationService){
      $scope.view = { 'dashboard': true, 'statistics': false };
    	$scope.pdDates = statistics.all();

      // Tie group leader change to slack group leaders that codes are sent

      $scope.fetchDateContents = function () {
        var searchValue = $scope.dateContents;
        var Year = searchValue.getFullYear();
        var Month = ("0" + (searchValue.getMonth() + 1)).slice(-2);
        var Day = ("0" + (searchValue.getDate())).slice(-2);
        var formattedDate = "" + Year + Month + Day;

    		$scope.allByDate = statistics.byDate(formattedDate);
      };
    }]
  };
});
