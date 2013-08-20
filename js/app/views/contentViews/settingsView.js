
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {
      templateOptions.showSearch = false;
      templateOptions.navigateable = true;
      templateOptions.subtitle = "Triff alle Einstellungen für iStudi";
      templateOptions.text = 'Du kannst die anzuzeigenden Uni-Gruppen ändern, oder die Push-Einstellungen bearbeiten.';
      templateOptions.data = [this.options.app.settings.models];
      return templateOptions;
    }

  });
});