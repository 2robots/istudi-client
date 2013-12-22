
angular.module('istudi.NewsDetailCtrl', [])

.controller('NewsDetailCtrl', function($scope, $rootScope, $routeParams, $models) {

	// models-object
	var news = $models("news");

	// callback, when this view's content loaded
	$scope.$on('$viewContentLoaded', function() {
    	$rootScope.title = $scope.title;
    	$rootScope.showBackButton = true;
    	$rootScope.backReference = "news";
    	$scope.$parent.dragContent = true;
	});

	// scope variables
  var item = news.find($routeParams.id);
  if(item != undefined) {
    $scope.id = $routeParams.id;
    $scope.title = item.title;
    $scope.date = item.date;
  } else {
    $scope.title = "Not found";
  }
});