
define(['text!templates/content/detailView.tpl', 'views/contentViews/_detailView'], function(Template, _detailView) {

  return _detailView.extend({

    alterTemplateOptions: function(templateOptions) {
      templateOptions.content = '<p>iStudi wird gerade upgedatet...</p>';
      return templateOptions;
    },

    afterRender: function() {
      var t = this;
      this.options.app.updater.start(function(){
        t.options.app.main.navigateBack();
      });
    }

  });
});