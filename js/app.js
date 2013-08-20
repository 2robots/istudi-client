
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

require(['zepto', 'underscore', 'backbone', 'snap', 'AppScroll', 'fastclick', 'models/config', 'views/appView', 'collections/menuItems', 'collections/nodes', 'models/node', 'collections/groups', 'models/newsArticle', 'collections/newsArticles', 'collections/settings', 'models/setting'], function(zepto, Underscore, Backbone, Snap, AppScroll, Fastclick, config, appView, menuItems, nodes, node, groups, newsArticle, newsArticles, settings, setting){

  /* When DOM is ready */
  Zepto(function($){

    /* enable Fastclick plugin */
    FastClick.attach(document.body);

    // require main view
    window.app = new appView;

    // initialize config
    window.app.config = new config(window.app);

    // initialize main controllers
    window.app.menuItems = new menuItems;
    window.app.menuItems.app = window.app;

    window.app.newsArticles = new newsArticles([], window.app);
    window.app.nodes = new nodes([], window.app);
    window.app.groups = new groups([], window.app);
    window.app.settings = new settings([], window.app);

    // add default settings
    window.app.settings.push(new setting({
      title: "Meine Uni Gruppen",
      detailView: {
        key: "groups",
        title: "iStudi",
        id: "groups",
        left_button: "back",
        right_button: "ok"
      }
    }));
    window.app.settings.push(new setting({title: "Push Einstellungen"}));

    // render app
    $("body").append(window.app.render().$el);
    window.app.afterRender();

    // render news
    if(false) {
      window.app.openContent(window.app.menuItems.get("news"));
      lets_go();

    // render initial-page-setup
    } else {
      window.app.groups.fetch({
        success: function(){
          window.app.openContent({key: "groups", title: "iStudi", id: 'groups', right_button: "ok"});
          lets_go();
        }
      });
    }
  });

  function lets_go() {
    // splash fade out
    $("#splash").animate({
      opacity: 0
    }, 300, 'ease-out', function(){
      $("#splash").remove();
    });
  }
});



