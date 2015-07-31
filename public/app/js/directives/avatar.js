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
    }],
    link: function(scope, elem, attr, ctrl){
      elem.attr("draggable", true);
      elem.on("dragstart", function(e){
        scope.dragToggle();
        e.target.style.opacity = "0.4";
        e.originalEvent.dataTransfer.setData("fellow", JSON.stringify(scope.each));
      });
      elem.on("dragend", function(e){
        e.target.style.opacity = "1";
        scope.dragToggle();
      });
    }
  };
}); 