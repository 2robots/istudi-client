
define(function() {

  return Backbone.Collection.extend({

    idAttribute: 'id',
    model: undefined,
    app: undefined,
    resource: '',

    initialize: function(models, app) {
      this.app = app;
    },

    url: function() {
      var ret = this.app.endpoint;
      var s = '?';
      ret += '/' + this.resource;

      if(this.addUrlParameters() != "") {
        ret += '?' + this.addUrlParameters();
        s = '&';
      }

      if(typeof(this.since()) != "undefined") {
        ret += s + 'since=' + this.since();
      }

      return ret;
    },

    addUrlParameters: function() {
      return "";
    },

    since: function() {
      return this.pluck("updated_at").sort().pop();
    },

    resource_name: function() {
      return this.app.name + "_" + this.resource;
    },

    load: function() {
      this.reset(JSON.parse(window.localStorage.getItem(this.resource_name())));
    },

    save: function() {
      window.localStorage.setItem(this.resource_name(), JSON.stringify(this));
    }
  });

});