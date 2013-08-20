
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {
      templateOptions.showSearch = true;
      templateOptions.navigateable = true;
      templateOptions.data = [this.options.app.newsArticles.models];
      return templateOptions;
    }

  });

});