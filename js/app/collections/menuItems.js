
define(['models/menuitem'], function(Model) {

  return Backbone.Collection.extend({
    model: Model,
    app: undefined
  });

});