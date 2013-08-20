
define(['views/menuView', 'views/mainView'], function(menuView, mainView) {

  return Backbone.View.extend({

    name: 'iStudi',
    tagName: 'div',
    id: 'app',
    //endpoint: 'http://localhost:3000',
    endpoint: 'http://192.168.0.56:3000',
    menuOpen: false,
    config: undefined,

    render: function(){

      this.menu = new menuView({ app: this });
      this.main = new mainView({ app: this });

      this.$el.html(this.menu.render().$el);
      this.$el.append(this.main.render().$el);

      return this;
    },

    afterRender: function() {

      var t = this;

      this.menu.afterRender();
      this.main.afterRender();

      this.menu.$el.wrap('<div class="snap-drawers">');

      this.snapper = new Snap({
        element: this.main.$el[0],
        disable: 'right',
        maxPosition: 266,
        minPosition: -266
      });

      this.snapper.on('animated', function(){
        if(t.menuOpen()) {
          t.$el.addClass("menu_open");
        } else {
          t.$el.removeClass("menu_open");
        }
      });
    },

    openMenu: function() {
      this.snapper.open("left");
    },

    closeMenu: function() {
      this.snapper.close("left");
    },

    menuOpen: function() {
      return (this.snapper.state().state == "left");
    },

    openContent: function(item, model, transition) {
      return this.main.openContent(item, model, transition);
    }
  });

});