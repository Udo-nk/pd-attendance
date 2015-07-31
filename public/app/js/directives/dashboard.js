var directive = angular.module('pdAttendance.directives', []);

directive.directive('dashboard', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/dashboard.html',
    controller: ['$rootScope', '$scope', 'group', 'LxDialogService', 'LxNotificationService', 'Fellows',
    function($rootScope, $scope, group, LxDialogService, LxNotificationService, Fellows){
      $scope.view = { 'dashboard': false, 'statistics': true };

      $scope.fellows = Fellows.all(); // get all fellows 
      $rootScope.allFellows = {};
      
      $scope.fellows.$loaded().then(function(){
        $scope.fellows.forEach(function(data){
          $rootScope.allFellows[data.$id] = data;
        });
      });

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
          Fellows.addToGroup($scope.currentGroup.$id, fellow);
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