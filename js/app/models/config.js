
define(function() {
  return Backbone.Model.extend({

    initialize: function(a, app) {

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
      window.localStorage.setItem(this.app.name + "_config", JSON.stringify(this));
    },

    load: function() {
      this.set(JSON.parse(window.localStorage.getItem(this.app.name + "_config")));
    }
  });
});