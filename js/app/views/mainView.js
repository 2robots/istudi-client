
define(['text!templates/mainTemplate.tpl'], function(Template) {

  return Backbone.View.extend({

    tagName: 'div',
    id: 'main',
    className: 'snap-content',
    template: _.template(Template),

    events: {
      "click .button.left": "toggleMenu"
    },

    render: function(){

      this.$el.html(this.template);
      this.header = this.$el.children(".header");
      this.content = this.$el.children(".content");

      //this.content.append('<div style="height: 4000px; background: blue;">lalalal</div>');

      return this;
    },

    afterRender: function() {
      this.scroller = new AppScroll({
        toolbar: this.header[0],
        scroller: this.content[0]
      });
    },

    toggleMenu: function(e) {

      if(this.options.app.menuOpen()) {
        this.options.app.closeMenu();
      } else {
        this.options.app.openMenu();
      }
    }
  });

});