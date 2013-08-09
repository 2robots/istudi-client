
define(['text!templates/content/detailView.tpl'], function(Template) {

  return Backbone.View.extend({

    template: _.template(Template),
    tagName: 'div',
    className: 'inner',
    templateOptions: {},

    events: {
      "click": "navigateBack"
    },

    alterTemplateOptions: function(templateOptions) {
      return templateOptions;
    },

    initialize: function() {
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
      this.options.app.openContent(this.options.app.menuItems.get("index"), undefined, "slideLeft");
    }
  });

});