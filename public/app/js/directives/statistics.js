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

      // order attendance data table
      $scope.predicate = 'slack';
      $scope.reverse = false;

      // order search by fellows
      $scope.firstO = 'name';
      $scope.secondO = false;

      var formattedDate;

      // Toggle order CSS class
      // $scope.toggleOrder = function (x) {
      // };

      $scope.switchOrder = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate ? !$scope.reverse : $scope.reverse);
        $scope.predicate = predicate;
      };

      $scope.sortOrder = function (firstO) {
        $scope.secondO = ($scope.firstO === firstO ? !$scope.secondO : $scope.reverse);
        $scope.firstO = firstO;
      };

      $scope.fetchDateContents = function () {
        var searchValue = $scope.dateContents,
            Year = searchValue.getFullYear(),
            Month = ("0" + (searchValue.getMonth() + 1)).slice(-2),
            Day = ("0" + (searchValue.getDate())).slice(-2);
        formattedDate = "" + Year + Month + Day;

    		$scope.allByDate = statistics.byDate(formattedDate);
        $scope.allByDate.$loaded().then(function (f) {
          angular.forEach(f, function(fellow) {
            fellow.state = 'idle';
          });
        });
      };

      $scope.fellowDetails = function (fellow_id) {
        $scope.getFellow = Fellows.find(fellow_id, function(data) {
          $scope.fellow = data;
          $scope.fellowStartDate = new Date(data.cohort.start_date * 1000);
          $scope.attendanceCounts = statistics.byFellow(data.slack_id);
        });
      };

      $scope.showForm = function (fellow) {
        fellow.showForm = true;
      };

      $scope.storeComment = function (fellow) {
        fellow.state = 'processing';
        statistics.addComment(formattedDate, fellow, function() {
          fellow.showForm = false;
          fellow.state = 'idle';
          $scope.$digest();
        });
      };
    }]
  };
});