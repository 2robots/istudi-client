
angular.module('istudi.MainCtrl', [])

.controller('MainCtrl', function($scope, $rootScope, $models, $route, $download, $push, Platform) {

	$scope.toggleMenu = function() {
		$scope.sideMenuController.toggleLeft();
	};
	
	$rootScope.downloadManager = $download();
  $rootScope.pushManager = $push();
	
	// get all my groups
  $rootScope.groups = $models("groups");
	
	Platform.ready(function() {	   
	  // Manage device-specific settings, like iOS7 Status Bar
	  ionic.Platform.detect();
	  
    // fire push register on startup
    $rootScope.pushManager.register();
	});

	$rootScope.title = "iStudi";
	$rootScope.showBackButton = false;
	$rootScope.backReference = $route.routes.null.redirectTo;
  
	$scope.menu = [
		{ title: 'Neuigkeiten', reference: '#news', icon: 'star' },
		{ title: 'Lagepläne', reference: '#maps', icon: 'map' },
		{ title: 'Pocketcards', reference: '#cards', icon: 'card' },
		{ title: 'Einstellungen', reference: '#settings', icon: 'wrench' }, 
		{ title: 'Über den VSStÖ', reference: '#about', icon: 'help-buoy' }
	];
});