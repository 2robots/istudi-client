
define(['collections/_contentCollection', 'models/map', 'models/menuItem'], function(_contentCollection, Model, menuItem) {

  return _contentCollection.extend({
    model: Model,
    resource: 'maps',
    defaultView: 'maps',

    initialize: function(models, app) {

      this.app = app;

      // add menu item
      this.app.menuItems.add(new menuItem({key: this.defaultView, title: "Lagepläne", left_button: "menu", position: 1000}));
    }
  });

});