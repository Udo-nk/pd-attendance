directive.directive('pdGroup', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/js/templates/pd_group.html',
    controller: ['$rootScope', '$scope', 'LxNotificationService', 'group', 'LxDialogService', 'Fellows',
    function($rootScope, $scope, LxNotificationService, group, LxDialogService, Fellows){

      $scope.dragActive = false;

      $scope.dragToggle = function(){
        $scope.dragActive = !$scope.dragActive;
        $scope.$apply();
      };

      $scope.archiveGroup = function(){
        LxNotificationService.confirm('Archive ' + $scope.pdgroup.name.toUpperCase() + ' PD group?' , 'This action will archive this group, do you still want to continue?', { cancel:'Yes Archive', ok:'Not today' }, function(answer){
          if(!answer){ 
            group.remove($scope.pdgroup.$id);
            LxNotificationService.success($scope.pdgroup.name.toUpperCase() + "PD group has been Archived");
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

      /* Drag and Drop functionality */
      $scope.onDrop = function($event){
        console.log($event);
      };

    }] 
  }
});