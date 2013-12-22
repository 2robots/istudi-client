
angular.module('istudi.CardsDetailCtrl', [])

.controller('CardsDetailCtrl', function($scope, $rootScope, $routeParams, $models) {
  
  // models-object
  var card = $models("pocketcards");

  // callback, when this view's content loaded
  $scope.$on('$viewContentLoaded', function() {
      $rootScope.title = $scope.title;
      $rootScope.showBackButton = true;
      $rootScope.backReference = "cards";
      
      setTimeout(function(){
        $scope.$$childHead.scrollView.options.scrollingX = true;
        $scope.$$childHead.scrollView.options.zooming = true;
        $scope.$parent.dragContent = false;
      });
  });

  // scope variables
  var item = card.find($routeParams.id);
  
  if(item != undefined) {
    $scope.id = $routeParams.id;
    $scope.title = item.title;
    $scope.url = item.local_url;
  } else {
    $scope.title = "Not found";
  }
});