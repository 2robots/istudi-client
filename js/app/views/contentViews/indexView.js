
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {
      templateOptions.data = window.appView.contentItems.models;
      templateOptions.navigation = true;
      return templateOptions;
    }
  });

});