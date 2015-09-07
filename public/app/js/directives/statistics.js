directive.directive('statistics', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/statistics.html',
    controller: ['$scope', 'statistics', 'Fellows', 'LxDialogService', 'LxNotificationService',
    function($scope, statistics, Fellows, LxDialogService, LxNotificationService){
      $scope.view = { 'dashboard': true, 'statistics': false };
    	$scope.pdDates = statistics.all();
      $scope.allFellows = Fellows.all();

      $scope.fetchDateContents = function () {
        var searchValue = $scope.dateContents;
        var Year = searchValue.getFullYear();
        var Month = ("0" + (searchValue.getMonth() + 1)).slice(-2);
        var Day = ("0" + (searchValue.getDate())).slice(-2);
        var formattedDate = "" + Year + Month + Day;

    		$scope.allByDate = statistics.byDate(formattedDate);
      };

      $scope.fellowDetails = function (fellow_id) {
        $scope.getFellow = Fellows.find(fellow_id, function(data) {
          $scope.fellow = data;
          $scope.fellowStartDate = new Date(data.cohort.start_date * 1000);
          $scope.attendanceCounts = statistics.byFellow(data.slack_id);
        });
      };
    }]
  };
});
