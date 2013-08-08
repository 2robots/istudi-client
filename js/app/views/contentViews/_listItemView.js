
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

      console.log("navigate");

      if(this.options.navigation) {
        this.options.app.openContent({ key: "detail", title: this.model.get("title") });
      }
    }
  });

});