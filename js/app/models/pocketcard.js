
define(function() {
  return Backbone.Model.extend({
    idAttribute: "id",

    downloadFile: function(success_cb, error_cb) {
      var t = this;

      // remote file url
      var remote_file_uri = encodeURI(this.collection.app.endpoint + this.get("absolute_url"));

      // local file url
      var local_file_uri = "pocketcard_" + this.get("id") + ".svg";

      if(typeof LocalFileSystem != "undefined") {

        // try to access file system
        window.requestFileSystem(
          LocalFileSystem.PERSISTENT,
          0,

          // if the filesystem is avaiable
          function onFileSystemSuccess(fileSystem) {

            // create a dummy file
            fileSystem.root.getFile(
              "dummy.svg",
              {create: true, exclusive: true},

              // access the file
              function gotFileEntry(fileEntry){

                // remove the file
                var sPath = fileEntry.fullPath.replace("dummy.svg","");
                var fileTransfer = new FileTransfer();
                fileEntry.remove();

                // download real svg into the dummy file
                fileTransfer.download(
                  remote_file_uri,
                  sPath + local_file_uri,

                  // on success
                  function(theFile) {
                    t.set("absolute_url", theFile.toURI());
                    success_cb();
                  },

                  // on error
                  function(error) {
                    error_cb(error);
                  }
                );
              },
            function(){
              t.useRemoteFile();
              error_cb();
            });
          },
        function(){
          t.useRemoteFile();
          error_cb();
        });
      } else {
        t.useRemoteFile();
        error_cb();
      }
    },

    useRemoteFile: function() {
      this.set("absolute_url", this.collection.app.endpoint + this.get("absolute_url"));
    },

    initializeContent: function() {
      this.set("detailView", { key: "_detailZoom", title: this.get("title"), id: "_details_" + this.cid, left_button: "back" });
      this.set("content", '<img src="' + this.get("absolute_url") + '" />');
    }

  });
});