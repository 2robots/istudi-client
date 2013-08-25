
define(['views/menuView', 'views/mainView', 'collections/menuItems', 'collections/nodes', 'models/node', 'collections/groups', 'models/newsArticle', 'collections/newsArticles', 'collections/settings', 'models/setting', 'models/config'], function(menuView, mainView, menuItems, nodes, node, groups, newsArticle, newsArticles, settings, setting, config) {

  return Backbone.View.extend({

    name: 'iStudi',
    tagName: 'div',
    id: 'app',
    // endpoint: 'http://localhost:3000',
    endpoint: 'http://192.168.1.20:3000',
    // endpoint: 'http://192.168.0.56:3000',
    //endpoint: 'http://istudi.herokuapp.com',
    menuOpen: false,

    initialize: function() {

      // initialize config
      this.config = new config(this);

      // initialize main controllers
      this.menuItems = new menuItems;
      this.menuItems.app = this;

      this.newsArticles = new newsArticles([], this);
      this.nodes = new nodes([], this);
      this.groups = new groups([], this);
      this.settings = new settings([], this);

      // add default settings
      this.settings.push(new setting({
        title: "Meine Uni Gruppen",
        detailView: {
          key: "groups",
          title: "iStudi",
          id: "groups",
          left_button: "back",
          right_button: "ok"
        }
      }));

      this.settings.push(new setting({title: "Push Einstellungen"}));
    },

    render: function(){

      var t = this;

      this.menu = new menuView({ app: this });
      this.main = new mainView({ app: this });

      this.$el.html(this.menu.render().$el);
      this.$el.append(this.main.render().$el);

      // render news
      if(false) {
        t.openContent(this.menuItems.get("news"));
        t.lets_go();

      // render initial-page-setup
      } else {
        t.groups.fetch({
          success: function(){
            t.openContent({key: "groups", title: "iStudi", id: 'groups', right_button: "ok"});
            t.lets_go();
          }
        });
      }

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
    },

    lets_go: function() {

      // splash fade out
      $("#splash").animate({
        opacity: 0
      }, 300, 'ease-out', function(){
        $("#splash").remove();
      });
    }
  });

});