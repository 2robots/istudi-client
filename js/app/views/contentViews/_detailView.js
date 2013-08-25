define(['text!templates/content/detailView.tpl'], function(Template) {

  return Backbone.View.extend({

    template: _.template(Template),
    tagName: 'div',
    className: 'inner',
    templateOptions: {},

    alterTemplateOptions: function(templateOptions) {
      return templateOptions;
    },

    initialize: function() {

      var t = this;

      this.on("leftButtonAction", function(){ t.navigateBack(); });

      this.templateOptions = {
        showFavIcon: false,
        content: this.model.get("content")
      };
      this.templateOptions = this.alterTemplateOptions(this.templateOptions);
    },

    render: function(){
      this.$el.html(this.template(this.templateOptions));
      return this;
    },

    afterRender: function() {
    },

    navigateBack: function() {
      this.options.app.main.navigateBack();
    }
  });
});