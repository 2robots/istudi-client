
angular.module('istudi.NodesDetailCtrl', [])

.controller('NodesDetailCtrl', function($scope, $rootScope, $routeParams, $models) {

	// models-object
	var nodes = $models("nodes");

	// callback, when this view's content loaded
	$scope.$on('$viewContentLoaded', function() {
    	$rootScope.title = $scope.title;
    	$rootScope.showBackButton = true;
    	$rootScope.backReference = "nodes/" + $scope.group_id;
    	$scope.$parent.dragContent = true;
	});

	// scope variables
  var item = nodes.find($routeParams.id);
  if(item != undefined) {
    $scope.id = $routeParams.id;
    $scope.title = item.title;
    $scope.content = item.content;
    $scope.group_id = item.group_id;
  } else {
    $scope.title = "Not found";
  }
});