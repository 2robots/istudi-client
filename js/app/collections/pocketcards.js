
define(['collections/_contentCollection', 'models/pocketcard', 'models/menuItem'], function(_contentCollection, Model, menuItem) {

  return _contentCollection.extend({
    model: Model,
    resource: 'pocketcards',
    defaultView: 'pocketcards',
    name_one: "Pocketcard",
    name_many: "Pocketcards",

    initialize: function(models, app) {

      this.app = app;

      // add menu item
      this.app.menuItems.add(new menuItem({key: this.defaultView, title: "Pocketcard", left_button: "menu", position: 1010}));
    }
  });

});