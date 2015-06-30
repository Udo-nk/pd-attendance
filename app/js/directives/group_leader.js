directive.directive('groupLeader', function(){
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/group_leader.html',
    controller: ['$rootScope', '$scope', function($rootScope, $scope){
      $scope.fellows.$loaded().then(function(){
        $scope.lead = $rootScope.allFellows[$scope.pdgroup.group_leader];
      });

    }]
  }
});