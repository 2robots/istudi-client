
define(['text!templates/content/detailZoomView.tpl', 'views/contentViews/_detailView', 'pinchzoom'], function(Template, _detailView, PinchZoom) {

  return _detailView.extend({

    className: 'inner loadable height_100',
    template: _.template(Template),

    afterRender: function() {

      //this.$el.find(".height_100").height($(".pt-page-current .content").height());
      new PinchZoom(this.$el.find("#zoomview"));
    }

  });
});