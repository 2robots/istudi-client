
define(['text!templates/menuTemplate.tpl'], function(Template) {

  return Backbone.View.extend({

    tagName: 'div',
    id: 'menu',
    className: 'snap-drawer',
    template: _.template(Template),

    events: {
      "click ol li": "open"
    },

    render: function(){

      this.$el.html(this.template);
      this.header = this.$el.children(".header");
      this.content = this.$el.children(".content");

      return this;
    },

    afterRender: function() {

      this.scroller = new AppScroll({
        toolbar: this.header[0],
        scroller: this.content[0]
      });
    },

    open: function(e) {
      var el = e.toElement;
      $(el).siblings().removeClass("active");
      $(el).addClass("active");

      this.options.app.closeMenu();
    }

  });

});