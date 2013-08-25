
define(['collections/_collection', 'models/group', 'models/menuItem'], function(_collection, Model, menuItem) {

  return _collection.extend({
    model: Model,
    resource: 'groups',
    defaultView: 'index',

    addMenuItems: function() {

      var t = this;

      // remove all groupsLinks, then generate the new ones
      t.app.menuItems.remove(t.app.menuItems.where({key: t.defaultView}));

      // add menu item for each checked group
      this.each(function(group) {

        if(group.checked()) {
          t.app.menuItems.add(
            new menuItem({
              key: t.defaultView,
              title: group.get("title"),
              left_button: "menu",
              object: group,
              position: group.get("position")+100
            })
          );
        }
      });

      // add menu item for global search
      t.app.menuItems.add(
        new menuItem({
          key: 'search',
          title: 'Volltextsuche',
          left_button: "menu",
          position: 1500
        })
      );
    }
  });

});