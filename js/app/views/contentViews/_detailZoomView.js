
define(['text!templates/content/detailZoomView.tpl', 'views/contentViews/_detailView', 'pinchzoom'], function(Template, _detailView, PinchZoom) {

  return _detailView.extend({

    template: _.template(Template),

    afterRender: function() {
      new PinchZoom(this.$el.find("#zoomview"));
    }

  });
});