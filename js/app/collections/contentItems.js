
define(['models/contentItem'], function(Model) {

  return Backbone.Collection.extend({
    model: Model
  });

});