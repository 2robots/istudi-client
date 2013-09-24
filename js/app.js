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

require(['zepto', 'underscore', 'backbone', 'snap', 'AppScroll', 'fastclick', 'views/appView'], function(zepto, Underscore, backbone, Snap, AppScroll, Fastclick, appView){



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

    document.addEventListener("backbutton", function(){
      if(typeof(window.app.main.navigateBack) != "undefined") {

        var item = window.app.main.currentContentSet.item;
        var command = "";

        if(item instanceof Backbone.Model) {
          command = item.get("left_button");
        } else {
          command = item.left_button;
        }

        if(command == "back") {
          window.app.main.navigateBack();
        }

        else if(command == "menu") {
          window.app.openMenu();
        }
      }
      return false;
    }, false);

    // invoke "deviceready" if there is no event (in a regular browser)
    if(typeof(cordova) == "undefined") {
      $(document).trigger("deviceready");
    }

  });
});



