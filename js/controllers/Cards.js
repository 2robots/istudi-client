
angular.module('istudi.CardsCtrl', [])

.controller('CardsCtrl', function($scope, $rootScope, $models) {

	// models-object
	var cards = $models("pocketcards");

	// callback, when this view's content loaded
	$scope.$on('$viewContentLoaded', function() {
    	$rootScope.title = $scope.title;
    	$rootScope.showBackButton = false;
    	$scope.$parent.dragContent = true;
	});

	// callback, when user pull's to refresh
	$scope.onRefresh = function() {
		cards.refresh(function(){
			
			// download files
			$rootScope.downloadManager.addAll("cards", cards, function(){
        $scope.$apply();  
      });
      
			// broadcast refesh finsihed
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// scope variables
	$scope.title = "Pocketcards";
	$scope.cards = cards;
	
	$scope.click_cb = function(e) {
    
    // only allow clicking, when the file-download has finished
    if(this.item.download_status != 100) {
      e.preventDefault();
    }
  }
});