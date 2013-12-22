
angular.module('istudi.NewsCtrl', [])

.controller('NewsCtrl', function($scope, $rootScope, $models) {

	// models-object
	var news = $models("news");

	// callback, when this view's content loaded
	$scope.$on('$viewContentLoaded', function() {
    	$rootScope.title = $scope.title;
    	$rootScope.showBackButton = false;
    	$scope.$parent.dragContent = true;
	});

	// callback, when user pull's to refresh
	$scope.onRefresh = function() {
		news.refresh(function(){
			// broadcast refesh finsihed
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// scope variables
	$scope.title = "Neuigkeiten";
	$scope.news = news;
});