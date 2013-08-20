
define(function() {
  return Backbone.Model.extend({

    initialize: function(app) {

      // get app instance
      this.app = app;

      // Load config from storage on init
      // TODO
    },

    saveConfig: function(key, value) {
      this.set(key, value);
    },

    getConfig: function(key) {
      return this.get(key);
    },

    save: function() {

    }
  });
});