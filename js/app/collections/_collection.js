
define(function() {

  return Backbone.Collection.extend({

    idAttribute: 'id',
    model: undefined,
    app: undefined,
    resource: '',
    reset_next_fetch: false,

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

      if(typeof(this.since()) != "undefined" && !this.reset_next_fetch) {
        ret += s + 'since=' + this.since();
      }

      this.reset_next_fetch = false;
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