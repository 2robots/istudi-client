
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {

      var data = new Backbone.Collection();

      this.options.app.groups.each(function(group){
        if(group.checked()) {
          data.push(group);
        }
      });

      templateOptions.data = data;
      templateOptions.subtitle = "Durchsuche alle Artikel von iStudi.";
      templateOptions.text = 'Groß- & Kleinschreibung ist egal, alle Artikel, bei denen mindestens ein Wort übereinstimmt werden angezeigt.';
      templateOptions.navigateable = true;
      templateOptions.searchable = true;
      templateOptions.filterDefaultValue = "Suche";
      return templateOptions;
    },

    data_attr: function() {
      return "all_nodes";
    },

    filter_action: function(pattern, item) {
      return (item.get("ancestry") != null && this.filterQuery != "" && (pattern.test(item.get("title")) || pattern.test(item.get("content"))));
    }
  });

});