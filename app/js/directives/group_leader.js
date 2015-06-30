directive.directive('groupLeader', function(){
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/group_leader.html',
    controller: ['$rootScope', '$scope', 'group', 'LxNotificationService',
    function($rootScope, $scope, group, LxNotificationService){
      $scope.fellows.$loaded().then(function(){
        $scope.lead = $rootScope.allFellows[$scope.pdgroup.group_leader];
      });

      $scope.setGroupLead = function(groupid, googleid){
        group.setGroupLead(groupid, googleid, function(err){
          LxNotificationService.success($scope.pdgroup.name.toUpperCase() + " has been updated");
        });
      };

    }],
    link: function(scope, elem, attr, ctrl){
      elem.on("dragover", function(e){
        e.preventDefault();
      });

      elem.on("dragenter", function(e){
        e.target.style.border = "3px dotted #FE8200";
      });

      elem.on("dragleave", function(e){
        e.target.style.border = "3px solid #FE8200";
      });

      elem.on("drop", function(e){
        e.target.style.border = "";
        var fellow = JSON.parse(e.originalEvent.dataTransfer.getData("fellow"));
        if(scope.pdgroup.$id === fellow.pd_group){
          scope.setGroupLead(scope.pdgroup.$id, fellow.$id);
          scope.lead = fellow;
        }
        e.preventDefault();
      });
    }
  };
});