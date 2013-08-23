
define(function() {
  return Backbone.Model.extend({

    idAttribute: "id",

    get_config: function() {
      var conf = this.collection.app.config.get("groups");

      if(typeof(conf) == "undefined") {
        conf = {};
      }

      if(typeof(conf[this.id]) == "undefined") {
        conf[this.id] = false;
      }

      return conf;
    },

    set_config: function(config){
      this.collection.app.config.set("groups", config);
    },

    checked: function() {
      var conf = this.get_config();
      return conf[this.id];
    },

    toggleChecked: function() {
      var conf = this.get_config();
      conf[this.id] = !conf[this.id];
      this.set_config(conf);

      this.collection.app.trigger("toggleGroupsCheck");
    }

  });
});