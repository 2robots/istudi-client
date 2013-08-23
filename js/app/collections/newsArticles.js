
define(['collections/_collection', 'models/newsArticle', 'models/menuItem'], function(_collection, Model, menuItem) {

  return _collection.extend({
    model: Model,
    resource: 'news',
    defaultView: 'news',

    initialize: function(models, app) {

      this.app = app;

      // add menu item
      this.app.menuItems.add(new menuItem({key: this.defaultView, title: "Neuigkeiten", left_button: "menu", position: 10}));
    },

    addUrlParameters: function() {

      var ret = "";
      var counter = 0;
      this.app.groups.each(function(group){

        // if this group is checked
        if(group.checked()) {
          if(counter > 0) {
            ret += "&";
          }

          counter++;
          ret += 'groups[]=' + group.id;
        }
      });

      return ret;
    }
  });

});