
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({

    alterTemplateOptions: function(templateOptions) {
      templateOptions.showSearch = false;
      templateOptions.checkable = true;
      templateOptions.subtitle = "Auf welcher Uni studierst du?";
      templateOptions.text = 'Du kannst eine oder mehrere Unis auswählen. Die Auswahl kannst du später unter "Einstellungen" auch ändern.';
      templateOptions.data = new Backbone.Collection(new Backbone.Model({data: this.options.app.groups}));
      return templateOptions;
    },

    afterRender: function() {

      var t = this;

      this.options.app.on("toggleGroupsCheck", function() {
          t.groupsCheckChanged();
      });

      this.options.app.main.trigger("rightButtonSetInactive");
    },

    groupsCheckChanged: function() {
      var c = 0;
      this.options.app.groups.each(function(group){
        if(group.checked()) {
          c++;
        }
      });

      if(c > 0) {
        this.options.app.main.trigger("rightButtonSetActive");
      } else {
        this.options.app.main.trigger("rightButtonSetInactive");
      }
    },

    leftButtonAction: function() {
      this.options.app.main.navigateBack();
    },

    rightButtonAction: function() {

      // save config
      this.options.app.config.save();

      // add menu items
      this.options.app.groups.addMenuItems();

      // show index-page
      this.options.app.openContent({key: "initial", title: "iStudi", id: 'initial', right_button: "ok"}, undefined, "slideRight");
    }

  });

});