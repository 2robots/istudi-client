
define(['text!templates/menu.tpl', 'views/menuItemView'], function(Template, menuItemView) {

  return Backbone.View.extend({

    tagName: 'div',
    id: 'menu',
    className: 'snap-drawer',
    template: _.template(Template),

    initialize: function() {

      var t = this;

      this.options.app.menuItems.bind("add", function(){
        t.render();
      });
    },

    render: function(){
      var t = this;

      this.$el.html(this.template);
      this.header = this.$el.children(".header");
      this.content = this.$el.children(".content");

      /* render menu item s*/
      this.options.app.menuItems.each(function(item){
        t.content.find("ol").append(new menuItemView({ model: item, app: t.options.app }).render().$el);
      });

      return this;
    },

    afterRender: function() {

      this.scroller = new AppScroll({
        toolbar: this.header[0],
        scroller: this.content[0]
      });
    }

  });

});