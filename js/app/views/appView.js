
define(['views/menuView', 'views/mainView', 'views/updateView', 'views/alertView', 'collections/menuItems', 'collections/nodes', 'models/node', 'collections/groups', 'models/newsArticle', 'collections/newsArticles', 'models/map', 'collections/maps', 'models/pocketcard', 'collections/pocketcards', 'collections/settings', 'models/setting', 'models/config'], function(menuView, mainView, updateView, alertView, menuItems, nodes, node, groups, newsArticle, newsArticles, map, maps, pocketcard, pocketcards, settings, setting, config) {

  return Backbone.View.extend({

    name: 'iStudi',
    tagName: 'div',
    id: 'app',
    endpoint: 'http://istudi.2robots.at',
    menuOpen: false,

    initialize: function() {

      // initialize config
      this.config = new config({}, this);

      // register Push Notifications
      this.registerPush();

      // initialize main controllers
      this.menuItems = new menuItems;
      this.menuItems.app = this;

      this.newsArticles = new newsArticles([], this);
      this.maps = new maps([], this);
      this.pocketcards = new pocketcards([], this);
      this.nodes = new nodes([], this);
      this.groups = new groups([], this);
      this.settings = new settings([], this);

      // add default settings
      this.settings.push(new setting({
        title: "Update iStudi",
        detailView: {
          key: "update",
          title: "Update iStudi",
          id: "update"
        }
      }));

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

      this.settings.push(new setting({
        title: "Impressum & Kontakt",
        detailView: {
          key: "imprint",
          title: "Impressum",
          id: "imprint",
          left_button: "back"
        }
      }));

      //this.settings.push(new setting({title: "Push Einstellungen"}));
    },

    render: function(){

      var t = this;

      this.menu = new menuView({ app: this });
      this.main = new mainView({ app: this });
      this.updater = new updateView({ app: this });
      this.alerter = new alertView({ app: this });

      this.$el.html(this.menu.render().$el);
      this.$el.append(this.main.render().$el);
      this.$el.append(this.updater.render().$el);
      this.$el.append(this.alerter.render().$el);

      // render news
      if(window.localStorage.getItem(t.name + "_config") != null) {

        // load config
        this.config.load();

        // load content
        t.groups.load();
        t.newsArticles.load();
        t.nodes.load();
        t.pocketcards.load();
        t.maps.load();

        // add menu items for groups
        t.groups.addMenuItems();

        // initialize relationships
        t.nodes.each(function(n){ n.initializeRelationships(); });

        t.updater.start(function(){
          t.openContent(t.menuItems.findWhere({key: "news"}));
          t.lets_go();
        });

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

    alert: function(title, message, button) {
      this.alerter.open({
        title: title,
        message: message,
        button: button
      });
    },

    openMenu: function() {
      this.snapper.open("left");
    },

    closeMenu: function() {
      this.snapper.close("left");
    },

    openUpdate: function() {
      this.$el.append(this.updater.start());
    },

    menuOpen: function() {
      return (this.snapper.state().state == "left");
    },

    openContent: function(item, model, transition) {
      return this.main.openContent(item, model, transition);
    },

    registerPush: function() {

      var t = this;

      try {
        pushNotification = window.plugins.pushNotification;

        // ANDROID
        if (device.platform == 'android' || device.platform == 'Android') {

          pushNotification.register(function(result){
            //alert(result);
          }, function(error){
            //alert(error);
          }, {
            "senderID":"843747827764",
            "ecb":"window.app.onNotificationGCM"
          });   // required!

        // IOS
        } else {

          pushNotification.register(function(token){

            t.config.saveConfig("ios_token", token);

          }, function(error){
            //alert(error);
          }, {
            "badge":"true",
            "sound":"true",
            "alert":"true",
            "ecb":"window.app.onNotificationAPN"
          });  // required!
        }
      }

      catch(err) {
        txt="There was an error on this page.\n\n";
        txt+="Error description: " + err.message + "\n\n";
        t.alert("Fehler", txt, "ok");
      }

    },

    // handle APNS notifications for iOS
    onNotificationAPN: function(e) {
      if (e.alert) {
        this.alert("Push-Nachricht", e.alert, "ok");
      }
    },

    // handle notifications for Android
    onNotificationGCM: function(e) {
      switch(e.event) {
        case 'registered':
          if ( e.regid.length > 0 ) {
            this.config.saveConfig("android_token", e.regid);
          }
        break;

        case 'message':
          this.alert("Push-Nachricht", e.payload.message, "ok");
        break;
      }
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