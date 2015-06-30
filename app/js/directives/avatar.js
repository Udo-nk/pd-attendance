directive.directive('avatar', function(){
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/avatar.html',
    controller: ['$rootScope', '$scope', 'Fellows', 'LxNotificationService', 'group',
    function($rootScope, $scope, Fellows, LxNotificationService, group){
      $scope.fellows.$loaded().then(function(){
        $scope.each = $rootScope.allFellows[$scope.person];
      });

      $scope.popup = function(person){
        var details = person.cohort.name + ' | ' + person.level;
        LxNotificationService.confirm(person.name, details, { cancel:'Remove from group', ok:'cancel' }, function(answer){
          if(!answer){
            var index = $scope.pdgroup.fellows.indexOf(person.$id);
            $scope.pdgroup.fellows.splice(index, 1);
            group.addFellows($scope.pdgroup.$id, $scope.pdgroup.fellows, function(err){
              console.log(err);
            });
            Fellows.removeFromGroup(person.$id);
          }
        });
      };

      // $scope.doubleClick = function(person){
      //   LxNotificationService.confirm(person.name, "do you want to make this person the group leader?", { cancel:'Not now', ok:'Yes' }, function(yes){
      //     if(yes){
      //       group.setGroupLead($scope.pdgroup.$id, person.$id);
      //       LxNotificationService.success(person.name + " is now group leader for group " + $scope.pdgroup.name);
      //     }
      //   });
      // };

    }]
  };
}); 