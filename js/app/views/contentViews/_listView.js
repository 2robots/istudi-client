
define(['views/contentViews/_listItemView', 'text!templates/content/searchView.tpl', 'text!templates/content/listView.tpl'], function(_listItemView, SearchTemplate, ListTemplate) {

  return Backbone.View.extend({

    searchTemplate: _.template(SearchTemplate),
    listTemplate: _.template(ListTemplate),
    tagName: 'div',
    className: 'inner',
    templateOptions: {},

    alterTemplateOptions: function(templateOptions) {
      return templateOptions;
    },

    initialize: function() {
      this.templateOptions = {
        showSearch: true,
        subtitle: false,
        navigation: false,
        itemClass: _listItemView,
        data: []
      };
      this.templateOptions = this.alterTemplateOptions(this.templateOptions);
    },

    render: function(){

      var curGroup = false;
      var t = this;

      this.$el.html(this.searchTemplate());

      _.each(this.templateOptions.data, function(group) {
        t.$el.append(t.listTemplate({group: group}));

        curGroup = t.$el.find("ul").last();

        _.each(group.get("data"), function(item) {
          curGroup.append(new _listItemView({ model: item, navigation: true, app: t.options.app }).render().$el);
        });
      });


      return this;
    },

    afterRender: function() {
    }
  });

});