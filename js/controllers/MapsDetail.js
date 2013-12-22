
angular.module('istudi.MapsDetailCtrl', [])

.controller('MapsDetailCtrl', function($scope, $rootScope, $routeParams, $models) {

  // models-object
  var map = $models("maps");

  // callback, when this view's content loaded
  $scope.$on('$viewContentLoaded', function() {
      $rootScope.title = $scope.title;
      $rootScope.showBackButton = true;
      $rootScope.backReference = "maps";
      
      setTimeout(function(){
        $scope.$$childHead.scrollView.options.scrollingX = true;
        $scope.$$childHead.scrollView.options.zooming = true;
        
        $scope.$parent.dragContent = false;
        
        a = $scope.$$childHead.scrollView;
      });
  });

  // scope variables
  var item = map.find($routeParams.id);
  
  if(item != undefined) {
    $scope.id = $routeParams.id;
    $scope.title = item.title;
    $scope.url = item.local_url;
  } else {
    $scope.title = "Not found";
  }
});