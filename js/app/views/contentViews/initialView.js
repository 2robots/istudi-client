
define(['text!templates/content/initialView.tpl'], function(Template) {

  return Backbone.View.extend({

    template: _.template(Template),
    tagName: 'div',
    className: 'inner',
    status: undefined,
    r_counter: 0,

    alterTemplateOptions: function(templateOptions) {
      return templateOptions;
    },

    initialize: function() {
      var t = this;
      this.on("leftButtonAction", function(){ t.leftButtonAction(); });
      this.on("rightButtonAction", function(){ t.rightButtonAction(); });
    },

    render: function(){
      this.$el.html(this.template(this.templateOptions));
      this.status = this.$el.find(".loading .status");
      return this;
    },

    afterRender: function() {

      this.options.app.main.trigger("rightButtonSetInactive");

      var t = this;
      var downloads_count = 4;
      // we count all download processes, so we know, when the last one is finished.

      // start downloading nodes
      t.r_counter++;
      t.options.app.nodes.fetch({
        success: function(){

          // initialize relationships on this nodes
          t.options.app.nodes.each(function(n){
            n.initializeRelationships();
          });

          //update status bar
          t.status.css("width", (parseInt(t.status.css("width")) + 100/downloads_count) + "%");

          //if this is the last download, we can finish the process
          t.finish_all_downloads();
        }
      });

      // start downloading news
      t.r_counter++;
      t.options.app.newsArticles.fetch({
        success: function(){

          //update status bar
          t.status.css("width", (parseInt(t.status.css("width")) + 100/downloads_count) + "%");

          //if this is the last download, we can finish the process
          t.finish_all_downloads();
        }
      });

      // start downloading maps
      t.options.app.maps.fetch({
        success: function(){

          // initialize content and detailView
          t.options.app.maps.each(function(n){

            t.r_counter++;

            n.downloadFile(

              // on success
              function(){
                //update status bar
                t.status.css("width", (parseInt(t.status.css("width")) + 100/downloads_count/t.options.app.maps.length) + "%");
                n.initializeContent();

                //if this is the last download, we can finish the process
                t.finish_all_downloads();
              },

              // on error
              function(){
                //update status bar
                t.status.css("width", (parseInt(t.status.css("width")) + 100/downloads_count/t.options.app.maps.length) + "%");
                n.initializeContent();

                //if this is the last download, we can finish the process
                t.finish_all_downloads();
              }
            );
          });
        }
      });

      // start downloading pocketcards
      t.options.app.pocketcards.fetch({
        success: function(){

          // initialize content and detailView
          t.options.app.pocketcards.each(function(n){

            t.r_counter++;

            n.downloadFile(

              // on success
              function(){
                //update status bar
                t.status.css("width", (parseInt(t.status.css("width")) + 100/downloads_count/t.options.app.maps.length) + "%");
                n.initializeContent();

                //if this is the last download, we can finish the process
                t.finish_all_downloads();
              },

              // on error
              function(){
                //update status bar
                t.status.css("width", (parseInt(t.status.css("width")) + 100/downloads_count/t.options.app.maps.length) + "%");
                n.initializeContent();

                //if this is the last download, we can finish the process
                t.finish_all_downloads();
              }
            );
          });
        }
      });
    },

    finish_all_downloads: function() {
      this.r_counter--;
      if(this.r_counter == 0) {

        // save config & all content
        this.options.app.config.save();
        this.options.app.groups.save();
        this.options.app.newsArticles.save();
        this.options.app.nodes.save();
        this.options.app.maps.save();
        this.options.app.pocketcards.save();

        this.options.app.main.trigger("rightButtonSetActive");
      }
    },

    rightButtonAction: function() {
      this.options.app.openMenu();
    }
  });
});


