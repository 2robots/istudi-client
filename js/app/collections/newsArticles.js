
define(['collections/_contentCollection', 'models/newsArticle', 'models/menuItem'], function(_contentCollection, Model, menuItem) {

  return _contentCollection.extend({
    model: Model,
    resource: 'news',
    defaultView: 'news',
    name_one: "Neuigkeit",
    name_many: "Neuigkeiten",

    comparator: function(a1, a2) {
      var d_a1 = Math.round(new Date(a1.get("date")).getTime()/1000);
      var d_a2 = Math.round(new Date(a2.get("date")).getTime()/1000);
      return d_a1 < d_a2;
    },

    initialize: function(models, app) {

      this.app = app;

      // add menu item
      this.app.menuItems.add(new menuItem({key: this.defaultView, title: "Neuigkeiten", left_button: "menu", position: 10}));
    }
  });

});