
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
    },

    // custom getter
    active_groups: function() {
      var gr = [];

      _.each(this.get("groups"), function(g, i){
        if(g) {
          gr.push(i);
        }
      });

      return gr;
    },

    token: function() {
      if(typeof(this.get("android_token")) != "undefined") {
        return this.get("android_token");
      } else {
        return this.get("ios_token");
      }
    },

    token_type: function() {
      if(typeof(this.get("android_token")) != "undefined") {
        return 'android';
      } else {
        return 'ios';
      }
    }
  });
});