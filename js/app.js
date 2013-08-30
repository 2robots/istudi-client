/* set up require.js with all the paths */
requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    views: '../app/views',
    templates: '../app/templates',
    models: '../app/models',
    collections: '../app/collections'
  }
});

require(['zepto', 'underscore', 'backbone', 'snap', 'AppScroll', 'fastclick', 'views/appView'], function(zepto, Underscore, Backbone, Snap, AppScroll, Fastclick, appView){



  /*Zepto(function($){

    document.addEventListener("deviceready", function () {

      // ONLY IN CHROME
      window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
        window.webkitRequestFileSystem(PERSISTENT, grantedBytes, function(){
          // enable Fastclick plugin
          FastClick.attach(document.body);

          // require main view
          window.app = new appView;

          // render app
          $("body").append(window.app.render().$el);
          window.app.afterRender();

        }, function(e){
        });
      }, function(e) {
      });

    }, false);

    // invoke "deviceready" if there is no event (in a regular browser)
    if(typeof(cordova) == "undefined") {
      $(document).trigger("deviceready");
    }

  });*/

  // NORMAL CODE
  Zepto(function($){

    document.addEventListener("deviceready", function () {
      // enable Fastclick plugin
      FastClick.attach(document.body);

      // require main view
      window.app = new appView;

      // render app
      $("body").append(window.app.render().$el);
      window.app.afterRender();

    }, false);

    // invoke "deviceready" if there is no event (in a regular browser)
    if(typeof(cordova) == "undefined") {
      $(document).trigger("deviceready");
    }

  });
});



