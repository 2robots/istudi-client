
define(['models/menuItem'], function(Model) {

  return Backbone.Collection.extend({
    model: Model
  });

});