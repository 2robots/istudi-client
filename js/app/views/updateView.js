
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
    download_queue: new Backbone.Collection(),

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
        t.options.app.groups.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){
          t.download_error = true;
          t.finished_step();
          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Gruppen aktualisiert werden.", "ok");
        }, remove: false});
        t.options.app.newsArticles.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){
          t.download_error = true;
          t.finished_step();
          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Neuigkeiten aktualisiert werden.", "ok");
        }, remove: false});
        t.options.app.nodes.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){
          t.download_error = true;
          t.finished_step();
          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Artikel aktualisiert werden.", "ok");
        }, remove: false});
        t.options.app.pocketcards.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){
          t.download_error = true;
          t.finished_step();
          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Pocketcards aktualisiert werden.", "ok");
        }, remove: false});
        t.options.app.maps.fetch({success: function(c, n){ t.finished_step(c, n); }, error: function(){
          t.download_error = true;
          t.finished_step();
          t.options.app.alert("Verbindungs-Fehler", "Es konnten möglicherweise nicht alle Lagepläne aktualisiert werden.", "ok");
        }, remove: false});
      }, 300);
    },

    finished_step: function(collection, new_ones) {

      var o = undefined;
      var t = this;

      if(typeof(collection) != "undefined" && typeof(new_ones) != "undefined") {
        if(new_ones.length > 0) {

          this.update_log += new_ones.length + " ";
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

              // push to the download_queue, later we will download all files
              t.download_queue.push(o);
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
        setTimeout(function(){
          t.stop();
        }, 200);

      }
    },

    stop: function() {
      var t = this;

      t.synchronize_downloads(t.download_queue, function(){
        if(!t.download_error) {
          if(this.update_log.length > 0) {
            this.options.app.groups.save();
            this.options.app.newsArticles.save();
            this.options.app.nodes.save();
            this.options.app.maps.save();
            this.options.app.pocketcards.save();

            this.options.app.alert("iStudi wurde aktualisiert!", "Es wurden: <strong>" + this.update_log.substr(0, this.update_log.length -2) + "</strong> upgedatet.", "ok");
          }
        }

        setTimeout(function(){
          t.$el.height(0);
          t.callback();
        }, 500);
      });
    },

    afterRender: function() {
    },

    synchronize_downloads: function(queue, finished) {
      this.synchronize_downloads_step(queue, queue.length, finished);
    },

    synchronize_downloads_step: function(queue, item_step, finished) {
      var model = queue.pop();
      var t = this;

      if(typeof(model) != "undefined") {

        t.r_counter++;
        model.downloadFile(

          // on success
          function() {
            model.initializeContent();

            //update status bar
            t.update_status_bar(item_step);

            // download next file
            t.synchronize_downloads_step(queue, item_step, finished);
          },

          // on error
          function() {
            t.options.app.alert("Verbindungs-Fehler", "'" + model.get("title") + "' konnte nicht heruntergeladen werden", "ok");
            t.download_error = true;
            model.initializeContent();

            //update status bar
            t.update_status_bar(item_step);

            // download next file
            t.synchronize_downloads_step(queue, item_step, finished);
          }
        );
      } else {
        finished();
      }
    }

  });

});