
angular.module('istudi.SettingsCtrl', [])

.controller('SettingsCtrl', function($scope, $rootScope) {

  // callback, when this view's content loaded
  $scope.$on('$viewContentLoaded', function() {
      $rootScope.title = $scope.title;
      $rootScope.showBackButton = false;
      $scope.$parent.dragContent = true;
      
      // we load every time the viewContent appears
      $scope.loading = true;
      
      // create groups object
      $rootScope.groups.refresh(function(){
                
        // stop loading animation
        $scope.loading = false;
      }, true);
  });
   
  $scope.title = "Einstellungen";
  
  // save changes to localStorage
  $scope.groupsChnaged = function() {
    $rootScope.groups.save();
    $rootScope.pushManager.registerServer();
  };
});