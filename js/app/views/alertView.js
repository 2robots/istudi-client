
define(['text!templates/alert.tpl'], function(Template) {
  return Backbone.View.extend({

    events: {
      "click .button": "button_click"
    },

    tagName: 'div',
    id: 'alert',
    template: _.template(Template),

    initialize: function() {
    },

    render: function(options){
      return this;
    },

    open: function(options) {
      var t = this;

      this.$el.html(this.template(options));
      t.$el.addClass("active");
      t.$el.addClass("open");
    },

    close: function() {
      var t = this;

      t.$el.removeClass("open");
      setTimeout(function() {
        t.$el.removeClass("active");
      }, 300);
    },

    button_click: function() {
      this.close();
    },

    afterRender: function() {
    }

  });

});