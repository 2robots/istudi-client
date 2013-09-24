
define(['text!templates/content/imprintView.tpl', 'views/contentViews/_detailView'], function(Template, _detailView) {

  return _detailView.extend({

    template: _.template(Template),

    initialize: function() {
      var t = this;
      this.on("leftButtonAction", function(){ t.navigateBack(); });
    }

  });
});