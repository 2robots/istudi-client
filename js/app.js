
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

require(['zepto', 'underscore', 'backbone', 'snap', 'AppScroll', 'fastclick', 'views/appView', 'collections/menuItems', 'models/menuItem', 'collections/contentItems', 'models/contentItem'], function(zepto, Underscore, Backbone, Snap, AppScroll, Fastclick, appView, menuItems, menuItem, contentItems, contentItem){

  /* When DOM is ready */
  Zepto(function($){

    /* enable Fastclick plugin */
    FastClick.attach(document.body);

    /* require main view, and initialize main models */
    window.appView = new appView;
    window.appView.menuItems = new menuItems;
    window.appView.contentItems = new contentItems;

    /* Pull all the content */
    pullMenuItems();
    pullContentItems();


    $("body").append(window.appView.render().$el);
    window.appView.afterRender();

    $("#splash").animate({
      opacity: 0
    }, 300, 'ease-out', function(){
      $("#splash").remove();
    });
  });

  function pullMenuItems() {
    window.appView.menuItems.add(new menuItem({key: "news", title: "Neuigkeiten"}));
    window.appView.menuItems.add(new menuItem({key: "index", title: "Inhalt"}));
  }

  function pullContentItems() {

    var c1 = new contentItem({ title: "Wer wir sind", content: "Lorem Ipsum" });
    var c2 = new contentItem({ title: "ÖH-Mitbestimmung an der Uni", content: "Lorem Ipsum" });
    var c3 = new contentItem({ title: "Frauen* an Universitäten", content: "Lorem Ipsum" });
    var c4 = new contentItem({ title: "Soziale Durchlässigkeit", content: "Lorem Ipsum" });

    var g1 = new contentItem({ title: "Einleitung", data: [c1, c2, c3, c4] });
    var g2 = new contentItem({ title: "Einleitung 2", data: [c1, c2, c3, c4] });
    var g3 = new contentItem({ title: "Lorem Ipsum", data: [c1, c2, c3, c4] });
    var g4 = new contentItem({ title: "Beihilfen", data: [c1, c2, c3, c4] });
    var g5 = new contentItem({ title: "Über uns", data: [c1, c2, c3, c4] });

    window.appView.contentItems.add(g1);
    window.appView.contentItems.add(g2);
    window.appView.contentItems.add(g3);
    window.appView.contentItems.add(g4);
    window.appView.contentItems.add(g5);
  }
});



