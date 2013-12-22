// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var modules = [
  
  // ionic modules
  'ionic', 
  'ngRoute', 
  'ngAnimate', 
  
  //services
  'istudi.models', 
  'istudi.download',
  'istudi.push',

  // controllers
  'istudi.MainCtrl', 
  'istudi.NewsCtrl', 
  'istudi.NewsDetailCtrl', 
  'istudi.MapsCtrl', 
  'istudi.MapsDetailCtrl',
  'istudi.CardsCtrl', 
  'istudi.CardsDetailCtrl',
  'istudi.NodesCtrl', 
  'istudi.NodesDetailCtrl', 
  'istudi.SettingsCtrl'
];

angular.module('istudi', modules)

.config(function ($compileProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/news', {
    templateUrl: 'templates/news.html',
    controller: 'NewsCtrl'
  });

  $routeProvider.when('/news/:id', {
    templateUrl: 'templates/newsDetail.html',
    controller: 'NewsDetailCtrl'
  });

  $routeProvider.when('/nodes/:id', {
    templateUrl: 'templates/nodes.html',
    controller: 'NodesCtrl'
  });
  
  $routeProvider.when('/node/:id', {
    templateUrl: 'templates/nodesDetail.html',
    controller: 'NodesDetailCtrl'
  });

  $routeProvider.when('/maps', {
    templateUrl: 'templates/maps.html',
    controller: 'MapsCtrl'
  });
  
  $routeProvider.when('/maps/:id', {
    templateUrl: 'templates/mapsDetail.html',
    controller: 'MapsDetailCtrl'
  });

  $routeProvider.when('/cards', {
    templateUrl: 'templates/cards.html',
    controller: 'CardsCtrl'
  });
  
  $routeProvider.when('/cards/:id', {
    templateUrl: 'templates/cardsDetail.html',
    controller: 'CardsDetailCtrl'
  });

  $routeProvider.when('/settings', {
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  });

  $routeProvider.when('/about', {
    templateUrl: 'templates/about.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/news'
  });

});

