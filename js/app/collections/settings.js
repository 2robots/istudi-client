
define(['collections/_collection', 'models/setting', 'models/menuItem'], function(_collection, Model, menuItem) {

  return _collection.extend({
    model: Model,
    defaultView: 'settings',

    initialize: function(models, app) {

      this.app = app;

      // add menu item
      this.app.menuItems.add(new menuItem({key: this.defaultView, title: "Einstellungen", left_button: "menu", position: "1000"}));
    }

  });

});