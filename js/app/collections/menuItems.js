
define(['models/menuitem'], function(Model) {

  return Backbone.Collection.extend({
    model: Model,
    app: undefined,
    name_one: "Menüpunkt",
    name_many: "Menüpunkte",

    comparator: function(item) {
      return item.get("position");
    }
  });

});