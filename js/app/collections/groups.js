
define(['collections/_collection', 'models/group', 'models/menuItem'], function(_collection, Model, menuItem) {

  return _collection.extend({
    model: Model,
    resource: 'groups',
    defaultView: 'index',

    addMenuItems: function() {

      var t = this;
      // add menu item for each checked group
      this.each(function(group) {
        if(group.checked()) {
          t.app.menuItems.add(
            new menuItem({
              key: t.defaultView,
              title: group.get("title"),
              left_button: "menu",
              object: group
            })
          );
        }
      });
    }
  });

});