var directive = angular.module('pdAttendance.directives', []);

directive.directive('dashboard', function(){
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/js/views/dashboard.html',
    controller: ['$scope', 'group', 'LxDialogService', 'LxNotificationService', 
    function($scope, group, LxDialogService, LxNotificationService){

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

      

    }]
  };
});


directive.directive('pdGroup', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/pd_group.html',
    controller: ['$scope', 'LxNotificationService', 'group', 'LxDialogService',
    function($scope, LxNotificationService, group, LxDialogService){

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

      $scope.showFellowsDialog = function(){
        LxDialogService.open('list-' + $scope.pdgroup.$id);
      };

    }] 
  }
});




