
define(['views/contentViews/_listView'], function(_listView) {

  return _listView.extend({
    alterTemplateOptions: function(templateOptions) {
      templateOptions.showSearch = false;
      templateOptions.navigateable = true;
      templateOptions.subtitle = "Triff alle Einstellungen für iStudi";
      templateOptions.text = 'Du kannst die anzuzeigenden Uni-Gruppen ändern. Je nachdem, welche Unis du angibst, bekommst du Neuigkeiten und Push-Nachrichten.';
      templateOptions.data = new Backbone.Collection(new Backbone.Model({data: this.options.app.settings}));
      return templateOptions;
    }

  });
});