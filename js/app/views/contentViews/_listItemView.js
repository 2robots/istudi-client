
define(['text!templates/content/listItemView.tpl'], function(Template) {

  return Backbone.View.extend({

    template: _.template(Template),
    tagName: 'li',
    templateOptions: {},
    events: {
      "click": "navigate"
    },

    render: function(){
      this.$el.html(this.template(this.options));
      return this;
    },

    afterRender: function() {
    },

    navigate: function() {
      if(this.options.navigation) {
        this.options.app.openContent({ key: "_detail", title: this.model.get("title"), id: "_details_" + this.model.cid }, this.model, "slideRight");
      }
    }
  });

});