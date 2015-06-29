var directive = angular.module('pdAttendance.directives', []);

directive.directive('dashboard', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/dashboard.html',
    controller: ['$scope', 'group', 'LxDialogService', 'LxNotificationService', 'Fellows',
    function($scope, group, LxDialogService, LxNotificationService, Fellows){

      $scope.fellows = Fellows.all(); // get all fellows 

      $scope.openDialog = function(){
        LxDialogService.open('create-group');
      };

      $scope.createGroup = function(name){
        var groupName = name.toLowerCase();
        if($scope.groupExists(groupName)){
          LxDialogService.close('create-group');
          LxNotificationService.warning("The PD group " + groupName + " already exists");
        }
        else if(groupName.length > 3){
          group.create(groupName, function(err){
            if(!err){
              LxDialogService.close('create-group');
              LxNotificationService.success("PD group " + groupName + " has been created");
            }
          });
        }
      };

      $scope.showFellowsDialog = function(pdgroup){
        $scope.eachFellow = {}; //reset checkboxes
        $scope.searchFellowsList = ''; // reset search box
         LxDialogService.open('fellows-list');
        $scope.currentGroup = pdgroup;
      };


      $scope.addToGroup = function(){
        var fellows = [];
        var allFellows;
        for(var key in $scope.eachFellow){
          if($scope.eachFellow.hasOwnProperty(key) && key){
            fellows.push(key);
          }
        }
        if($scope.currentGroup.fellows){
          var allFellows = fellows.concat($scope.currentGroup.fellows);
        } else {
          allFellows = fellows;
        }

        //Update all selected fellows
        allFellows.forEach(function(fellow){
          Fellows.updateGroup($scope.currentGroup.$id, fellow);
        });

        group.addFellows($scope.currentGroup.$id, allFellows, function(err){
          console.log(err);
        });

        LxDialogService.close('fellows-list');
        LxNotificationService.success("PD group " + $scope.currentGroup.name + " has been updated");

      };

    }]
  };
});

directive.directive('pdGroup', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/pd_group.html',
    controller: ['$rootScope', '$scope', 'LxNotificationService', 'group', 'LxDialogService',
    function($rootScope, $scope, LxNotificationService, group, LxDialogService){

      $scope.deleteGroup = function(){
        LxNotificationService.confirm('Delete ' + $scope.pdgroup.name.toUpperCase() + ' PD group?' , 'This action cannot be undone, do you still want to continue?', { cancel:'Yes delete', ok:'Not today' }, function(answer){
          if(!answer){
            group.delete($scope.pdgroup.$id);
            LxNotificationService.success($scope.pdgroup.name.toUpperCase() + " PD group has been deleted");
          }
        });
      };

      $scope.editGroup = function(){
        LxDialogService.open($scope.pdgroup.$id);
      };

      $scope.rename = function(name){
        if($scope.groupExists(name)){
          LxDialogService.close($scope.pdgroup.$id);
          LxNotificationService.warning("The PD group " + name + " already exists");
        } else {
          group.rename($scope.pdgroup.$id, name, function(err){
            if(err){
              LxNotificationService.error(err);
            }
          });
          LxDialogService.close($scope.pdgroup.$id);
        }
      };

    }] 
  }
});

directive.directive('avatar', function(){
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/avatar.html',
    controller: ['$scope', 'Fellows', function($scope, Fellows){
      Fellows.find($scope.person, function(data){
        $scope.each = data;
      });
    }]
  };
}); 