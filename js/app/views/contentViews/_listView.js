
define(['views/contentViews/_listItemView', 'text!templates/content/listHeaderView.tpl', 'text!templates/content/listView.tpl'], function(_listItemView, listHeaderTemplate, ListTemplate) {

  return Backbone.View.extend({

    listHeaderTemplate: _.template(listHeaderTemplate),
    listTemplate: _.template(ListTemplate),
    listContainer: undefined,
    tagName: 'div',
    className: 'inner',
    templateOptions: {},
    filterQuery: "",
    events: {
      "keyup #search input": "searchChanged"
    },

    alterTemplateOptions: function(templateOptions) {
      return templateOptions;
    },

    initialize: function() {

      var t = this;

      this.on("leftButtonAction", function(){ t.leftButtonAction(); });
      this.on("rightButtonAction", function(){ t.rightButtonAction(); });

      this.templateOptions = {
        showSearch: true,
        subtitle: false,
        text: false,
        navigateable: false,
        checkable: false,
        itemClass: _listItemView,
        data: []
      };

      this.templateOptions = this.alterTemplateOptions(this.templateOptions);
    },

    searchChanged: function(obj) {

      // set filterQuery to search string
      this.filterQuery = $(obj.target).val();

      // rerender lists
      this.renderLists();
    },

    render: function(){

      // display search bar and/or subtitle and/or text
      this.$el.html(this.listHeaderTemplate(this.templateOptions));

      // add list container
      this.listContainer = $('<div id="listcontainer" />').appendTo(this.$el);

      // render list
      this.renderLists();


      return this;
    },

    renderLists: function() {

      var curGroup = false;
      var title = undefined;
      var data = [];
      var t = this;
      var itemCounter = 0;

      // create a pattern without any special chars from filterQuery
      var pattern = new RegExp(this.filterQuery.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"),"gi");

      // clear container
      t.listContainer.empty();

      /* render each object.
         if it is a node-model-object, we show it as nested list. If not,
         we just display a list.
      */
      _.each(this.templateOptions.data, function(obj) {

        itemCounter = 0;

        if(obj instanceof Backbone.Model) {
          title = obj.get("title");
          data = obj.get("data");
        } else {
          data = obj;
        }

        // for each group render a list
        t.listContainer.append(t.listTemplate({title: title}));
        curGroup = t.listContainer.find("ul").last();

        // for each list add all items
        _.each(data, function(item) {

          // if there is no search query, or the pattern matches
          if(t.filterQuery == "" || pattern.test(item.get("title"))) {

            // render our super generic listItem
            curGroup.append(new _listItemView({

              // model we take the title from
              model: item,

              // should this item be navigateable (e.g. to display a detailView)
              navigateable: t.templateOptions.navigateable,

              // should this item be checkable (e.g. for a config-view)
              checkable: t.templateOptions.checkable,

              // main app
              app: t.options.app
            }).render().$el);

            itemCounter++;
          }
        });

        if(itemCounter == 0) {
          curGroup.prev().remove();
          curGroup.remove();
        }

      });

    },

    afterRender: function() {
    },

    leftButtonAction: function() {
      this.options.app.main.toggleMenu();
    },

    rightButtonAction: function() {
    }
  });

});