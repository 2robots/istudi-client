
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {
      templateOptions.showSearch = false;
      return templateOptions;
    }

  });

});