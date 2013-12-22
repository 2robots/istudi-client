
angular.module('istudi.MainCtrl', [])

.controller('MainCtrl', function($scope, $rootScope, $models, $route, $download, $push, Platform, Modal, $filter) {

	$scope.toggleMenu = function() {
		$scope.sideMenuController.toggleLeft();
	};
	
  $rootScope.pushManager = $push();
	
	// get all my groups
  $rootScope.groups = $models("groups");
	
	Platform.ready(function() {
	  	   
	  // Manage device-specific settings, like iOS7 Status Bar
	  ionic.Platform.detect();
	  
	  // create the downloadmanager
	  $rootScope.downloadManager = $download();
	  
    // fire push register on startup
    $rootScope.pushManager.register();
	});

	$rootScope.title = "iStudi";
	$rootScope.showBackButton = false;
	$rootScope.backReference = $route.routes.null.redirectTo;
	
	$rootScope.inMyGroups = function(item) {
	  
	  //@TODO: The server needs to send groups for each object, so we can tell
	  // if this item is in this group
	   
	  //console.log(item);
	  //console.log($rootScope.groups.indexOf(item));
	  return true;
	};
  
	$scope.menu = [
		{ title: 'Neuigkeiten', reference: '#news', icon: 'star' },
		{ title: 'Lagepläne', reference: '#maps', icon: 'map' },
		{ title: 'Pocketcards', reference: '#cards', icon: 'card' },
		{ title: 'Einstellungen', reference: '#settings', icon: 'wrench' }, 
		{ title: 'Über den VSStÖ', reference: '#about', icon: 'help-buoy' }
	];
	
	
	// Load the modal from the given template URL
  Modal.fromTemplateUrl('helloModal.html', function(modal) {
    $scope.modal = modal;
    
    // Open the hello modal, of there is no group selected
    if($filter('filter')($rootScope.groups, {value: true}).length == 0) {
      $scope.modal.show();
    }   
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    
    // open menu
    setTimeout(function(){
      $scope.sideMenuController.toggleLeft();
    }, 500);
  };
	
	
});