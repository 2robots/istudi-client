
define(['collections/_contentCollection', 'models/newsArticle', 'models/menuItem'], function(_contentCollection, Model, menuItem) {

  return _contentCollection.extend({
    model: Model,
    resource: 'news',
    defaultView: 'news',
    name_one: "Neuigkeit",
    name_many: "Neuigkeiten",

    initialize: function(models, app) {

      this.app = app;

      // add menu item
      this.app.menuItems.add(new menuItem({key: this.defaultView, title: "Neuigkeiten", left_button: "menu", position: 10}));
    }
  });

});