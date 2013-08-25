
define(['text!templates/content/listItemView.tpl'], function(Template) {

  return Backbone.View.extend({

    template: _.template(Template),
    tagName: 'li',
    templateOptions: {},
    events: {
      "click": "click_action"
    },

    render: function(){
      this.$el.html(this.template(this.options));
      return this;
    },

    afterRender: function() {
    },

    click_action: function() {

      // make this item navigateable
      if(this.options.navigateable) {

        var dView = null;

        // check if the model has a "detailView"-attribute
        if(typeof(this.model.get("detailView")) != "undefined") {
          dView = this.model.get("detailView");
        } else {
          dView = { key: "_detail", title: this.model.get("title"), id: "_details_" + this.model.cid, left_button: "back" };
          //dView = { key: "_detailZoom", title: this.model.get("title"), id: "_details_" + this.model.cid, left_button: "back" };
        }

        this.options.app.openContent(dView, this.model, "slideRight");
      }

      // make this item checkable
      if(this.options.checkable) {
        this.model.toggleChecked();
        this.render();
      }
    }
  });

});