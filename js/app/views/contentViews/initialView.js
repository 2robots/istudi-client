
define(['text!templates/content/initialView.tpl', 'jquery'], function(Template, jQuery) {

  return Backbone.View.extend({

    template: _.template(Template),
    tagName: 'div',
    className: 'inner',
    status: undefined,
    r_counter: 0,
    status_width: 0,
    downloads_count: 5,
    download_error: false,
    events: {
      "click .go_button": "rightButtonAction"
    },

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
      // we count all download processes, so we know, when the last one is finished.

      // start downloading nodes
      t.r_counter++;
      t.options.app.nodes.reset_next_fetch = true;
      t.options.app.nodes.fetch({
        success: function(){

          // initialize relationships on this nodes
          t.options.app.nodes.each(function(n){
            n.initializeRelationships();
          });

          //update status bar
          t.update_stauts(100/t.downloads_count);

          //if this is the last download, we can finish the process
          t.finish_all_downloads();
        }, error: function() {

          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Artikel heruntergeladen werden", "ok");
          t.download_error = true;
          t.update_stauts(100/t.downloads_count);
          t.finish_all_downloads();
        }
      });

      // start downloading news
      t.r_counter++;
      t.options.app.newsArticles.reset_next_fetch = true;
      t.options.app.newsArticles.fetch({
        success: function(){

          //update status bar
          t.update_stauts(100/t.downloads_count);

          //if this is the last download, we can finish the process
          t.finish_all_downloads();
        }, error: function() {

          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Neuigkeiten heruntergeladen werden", "ok");
          t.download_error = true;

          t.update_stauts(100/t.downloads_count);
          t.finish_all_downloads();
        }
      });

      // start downloading maps
      t.options.app.maps.reset_next_fetch = true;
      t.options.app.maps.fetch({
        success: function(){

          if(t.options.app.maps.length > 0) {

            // create a maps_queue, for synchron download
            t.synchronize_downloads(new Backbone.Collection(t.options.app.maps.models));

          } else {
            t.update_stauts(100/t.downloads_count);
            t.finish_all_downloads();
          }
        }, error: function() {

          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Lagepläne heruntergeladen werden", "ok");
          t.download_error = true;
          t.update_stauts(100/t.downloads_count);
          t.finish_all_downloads();
        }
      });

      // start downloading pocketcards
      t.options.app.pocketcards.reset_next_fetch = true;
      t.options.app.pocketcards.fetch({
        success: function(){

          if(t.options.app.pocketcards.length > 0) {

            // create a pocketcards_queue, for synchron download
            t.synchronize_downloads(new Backbone.Collection(t.options.app.pocketcards.models));
          } else {
            t.update_stauts(100/t.downloads_count);
            t.finish_all_downloads();
          }
        }, error: function() {
          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Pocketcards heruntergeladen werden", "ok");
          t.download_error = true;
          t.update_stauts(100/t.downloads_count);
          t.finish_all_downloads();
        }
      });

      // send push notification token to server
      t.r_counter++;


      if(typeof(t.options.app.config.token()) != "undefined") {

        // zepto isn't working, use jQuery
        jQuery.post(
          t.options.app.endpoint + '/device_tokens',
          {
            token: t.options.app.config.token(),
            type: t.options.app.config.token_type(),
            groups: t.options.app.config.active_groups()
          }
        ).done(function(){
          // nothing on done
        }).fail(function(){
          setTimeout(function(){
            t.options.app.alert("Verbindungs-Fehler", "Wir konnten dein Gerät nicht für Push-Nachrichten registrieren.", "ok");
          }, 500);

        }).always(function(){
          t.update_stauts(100/t.downloads_count);
          t.finish_all_downloads();
        });
      } else {
        t.update_stauts(100/t.downloads_count);
        t.finish_all_downloads();
      }
    },

    update_stauts: function(add) {
      this.status_width = this.status_width + add;
      this.status.css("width", this.status_width + "%");
    },

    finish_all_downloads: function() {
      var t = this;
      this.r_counter--;
      if(this.r_counter == 0) {

        // save config & all content
        this.options.app.config.save();
        this.options.app.groups.save();
        this.options.app.newsArticles.save();
        this.options.app.nodes.save();
        this.options.app.maps.save();
        this.options.app.pocketcards.save();
        /*if(this.download_error) {
          setTimeout(function(){
            t.options.app.alert("Verbindungs-Fehler", "Bei der Verbindung zum Server ist ein Fehler aufgetreten. Möglicherweise konnten nicht alle Inhalte heruntergeladen werden.", "ok");
          }, 500);
        }*/

        this.$el.find(".go_button").css("opacity", 1);
        this.options.app.main.trigger("rightButtonSetActive");
      }
    },

    rightButtonAction: function() {
      this.options.app.openMenu();
      return false;
    },

    synchronize_downloads: function(queue) {
      this.r_counter++;
      this.synchronize_downloads_step(queue, 100/this.downloads_count/queue.length);
    },

    synchronize_downloads_step: function(queue, item_step) {
      var model = queue.pop();
      var t = this;

      if(typeof(model) != "undefined") {

        t.r_counter++;

        // if this an active model
        if(model.get("active")) {

          model.downloadFile(

            // on success
            function() {
              //update status bar
              t.update_stauts(item_step);
              model.initializeContent();

              //if this is the last download, we can finish the process
              t.finish_all_downloads();

              // download next file
              t.synchronize_downloads_step(queue, item_step);
            },

            // on error
            function() {
              t.options.app.alert("Verbindungs-Fehler", "'" + model.get("title") + "' konnte nicht heruntergeladen werden", "ok");
              t.download_error = true;
              //update status bar
              t.update_stauts(item_step);
              model.initializeContent();

              //if this is the last download, we can finish the process
              t.finish_all_downloads();

              // download next file
              t.synchronize_downloads_step(queue, item_step);
            }
          );

        // if this is not active, do next
        } else {
          t.update_stauts(item_step);
          t.finish_all_downloads();
          t.synchronize_downloads_step(queue, item_step);
        }
      } else {
        t.finish_all_downloads();
      }
    }
  });
});


