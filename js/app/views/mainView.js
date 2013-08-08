
define(['text!templates/main.tpl', 'views/contentViews/indexView', 'views/contentViews/newsView'], function(Template) {

  return Backbone.View.extend({

    tagName: 'div',
    id: 'main',
    className: 'snap-content',
    template: _.template(Template),
    title: "iStudi",

    events: {
      "click .button.left": "toggleMenu"
    },

    render: function(){

      this.$el.html(this.template({ title: this.title }));
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

    toggleMenu: function(e) {
      if(this.options.app.menuOpen()) {
        this.options.app.closeMenu();
      } else {
        this.options.app.openMenu();
      }
    },

    openContent: function(item) {

      var key = "";
      var title = "";


      if(item instanceof Backbone.Model) {
        key = item.get("key");
        title = item.get("title");
      } else {
        key = item.key;
        title = item.title;
      }

      var name = 'views/contentViews/' + key + 'View';
      var t = this;

      try {
        require([name], function(view){
          t.title = title;
          t.render();
          t.afterRender();
          t.contentView = new view({ app: t.options.app });
          t.content.html(t.contentView.render().$el);
        });

        return true;
      } catch(error) {
        return false;
      }
    }

  });

});