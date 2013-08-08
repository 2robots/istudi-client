
define(function(){

  return Backbone.View.extend({

    tagName: 'div',
    className: 'inner',
    templateOptions: {},

    alterTemplateOptions: function(templateOptions) {
      return templateOptions;
    },

    initialize: function() {
      this.templateOptions = {
        showFavIcon: false,
        content: ""
      };
      this.templateOptions = this.alterTemplateOptions(this.templateOptions);
    },

    render: function(){
      this.$el.html(this.template(this.templateOptions));
      return this;
    },

    afterRender: function() {
    }
  });

});