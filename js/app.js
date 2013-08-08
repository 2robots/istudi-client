
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

require(['zepto', 'underscore', 'backbone', 'snap', 'AppScroll'], function(){


  /* When DOM is ready */
  Zepto(function($){

    /* require main view */
    require(['views/appView'], function(appViewClass){

      window.appView = new appViewClass;
      $("body").append(window.appView.render().$el);
      window.appView.afterRender();

    });
  });
});