
define(function() {

  return Backbone.Collection.extend({

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

    load: function() {

    }
  });

});