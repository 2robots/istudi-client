
define(['text!templates/update.tpl'], function(Template) {
  return Backbone.View.extend({

    events: {
      "click .close": "stop"
    },

    update_log: "",
    callback: undefined,

    tagName: 'div',
    id: 'update',
    template: _.template(Template),
    status: undefined,
    download_error: false,

    initialize: function() {
    },

    render: function(){
      this.$el.html(this.template({}));
      this.$el.height(0);
      return this;
    },

    start: function(callback) {
      var t = this;
      this.callback = callback;
      this.status = this.$el.find(".loading .status");
      this.$el.height(100);
      this.count = 5;
      this.counter = 5;
      this.status.css("width", 0);
      this.update_log = "";

      setTimeout(function(){
        t.options.app.groups.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){ t.download_error = true; t.finished_step(); }, remove: false});
        t.options.app.newsArticles.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){ t.download_error = true; t.finished_step(); }, remove: false});
        t.options.app.nodes.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){ t.download_error = true; t.finished_step(); }, remove: false});
        t.options.app.pocketcards.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){ t.download_error = true; t.finished_step(); }, remove: false});
        t.options.app.maps.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){ t.download_error = true; t.finished_step(); }, remove: false});
      }, 300);
    },

    finished_step: function(collection, new_ones) {

      var o = undefined;
      var t = this;

      if(typeof(collection) != "undefined" && typeof(new_ones) != "undefined") {
        if(new_ones.length > 0) {

          this.update_log += new_ones.length + " ";
          abc = new_ones;
          if(new_ones.length == 1) {
            this.update_log += collection.name_one;
          } else {
            this.update_log += collection.name_many;
          }

          this.update_log += ", ";

          // save this collection
          _.each(new_ones, function(obj){
            o = collection.get(obj.id);

            if(typeof(o.initializeRelationships) != "undefined") {
              o.initializeRelationships();
            }

            if(typeof(o.downloadFile) != "undefined") {
              o.downloadFile(
                // on success
                function(){
                  o.initializeContent();
                  t.update_status_bar(new_ones.length);
                },

                // on error
                function(){
                  o.initializeContent();
                  t.update_status_bar(new_ones.length);
                  t.download_error = true;
                }
              );
            } else {
              t.update_status_bar(new_ones.length);
            }
          });

        // when there are no new ones
        } else {
          t.update_status_bar(1);
        }
      } {
        t.update_status_bar(1);
      }
    },

    update_status_bar: function(items_in_this_collection) {
      var t = this;
      t.status.css("width", (parseInt(t.status.css("width")) + 100/(t.count * items_in_this_collection)) + "%");
      t.counter = t.counter -1;

      // if it is the last, close updater
      if(this.counter == 0) {
        this.stop();
      }
    },

    stop: function() {

      var t = this;

      if(t.download_error) {
        setTimeout(function(){
          t.options.app.alert("Verbindungs-Fehler", "Bei der Verbindung zum Server ist ein Fehler aufgetreten. Möglicherweise konnten nicht alle Inhalte heruntergeladen werden.", "ok");

          setTimeout(function(){
            t.$el.height(0);
            t.callback();
          }, 100);

        }, 500);
      } else {
        if(this.update_log.length > 0) {
          this.options.app.groups.save();
          this.options.app.newsArticles.save();
          this.options.app.nodes.save();
          this.options.app.maps.save();
          this.options.app.pocketcards.save();

          this.options.app.alert("iStudi wurde aktualisiert!", "Es wurden: <strong>" + this.update_log.substr(0, this.update_log.length -2) + "</strong> upgedatet.", "ok");
        }

        setTimeout(function(){
          t.$el.height(0);
          t.callback();
        }, 500);
      }
    },

    afterRender: function() {
    }

  });

});