
angular.module('istudi.NodesCtrl', [])

.controller('NodesCtrl', function($scope, $rootScope, $routeParams, $models) {

  // models-object
  $scope.nodes = $models("nodes");
  $scope.group = $rootScope.groups.find($routeParams.id);
  

  // callback, when this view's content loaded
  $scope.$on('$viewContentLoaded', function() {
      $rootScope.title = $scope.title;
      $rootScope.showBackButton = false;
      $scope.$parent.dragContent = true;
  });

  // callback, when user pull's to refresh
  $scope.onRefresh = function() {
    $scope.nodes.refresh(function(){
      // broadcast refesh finsihed
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  // scope variables
  $scope.title = $scope.group.title;
  
});