
define(function() {

  return Backbone.View.extend({

    tagName: 'li',

    events: {
      "click": "open"
    },

    render: function(){
      this.$el.html(this.model.get("title"));
      return this;
    },

    open: function(e) {

      if(this.options.app.openContent(this.model)) {
        this.$el.siblings().removeClass("active");
        this.$el.addClass("active");
        this.options.app.closeMenu();
      }
    }

  });
});