
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {
      templateOptions.data = this.options.model.get("root_nodes");
      templateOptions.navigateable = true;
      return templateOptions;
    }
  });

});