
angular.module('istudi.download', [], function($provide){
  $provide.factory('$download', function($http){
    return function() {
      
      var downloadService = {
        
        queue: [], 
        objects: null, 
        filePath: null, 
        
        /**
         * initialize downloadService
         */
        init: function() {
          var t = this;
          this.getFilePath(function(path){
            t.filePath = path;
          });
        }, 
        
        /**
         * add an object to the downlaod queue. 
         * @param {Object} resource
         * @param {Object} object
         */
        add: function(resource, object, cb) {
          if(this.filePath != null) {
            object.download_status = 0;
            this.queue.push({resource: resource, object: object});
            this.run(cb);
          } else {
            console.log("there is no local filepath avaiable");
          }
        }, 
        
        /**
         * add a collection of items to the queue
         */
        addAll: function(resource, objects, cb) {
          if(this.filePath != null) {
            console.log("add all files to download queue");
            
            var t = this;
            this.objects = objects;
            
            objects.forEach(function(o){
              
              if(o.download_status == undefined || o.download_status == null) {
                o.download_status = 0;  
              }
              t.queue.push({resource: resource, object: o});  
            });
            
            this.run(cb);
          } else {
            console.log("there is no local filepath avaiable");
          }
        }, 
        
        /**
         * run the queue
         */
        run: function(cb) {
          
          console.log("*NEXT RUN, QUEUE-SIZE: " + this.queue.length + "*");
          
          var t = this;

          // if there are items in the queue
          if(this.filePath != null && this.queue.length > 0) {
            
            console.log("Start downloading file...");
            
            setTimeout(function(){
              
              // get item from queue
              var d = t.queue.pop();
              
              if(d != undefined && d != null) {
                // download the file, and call run again, when finished.
                t.download(d.resource, d.object, cb, function(){
                  t.run(cb);
                });
              }
            });
          } else {
            cb();
          }
        }, 
        
        /**
         * returns the parent directory for all items
         */
        getFilePath: function(cb) {
          
          console.log("trying to get getFilePath...");
          
          // trying to access file system
          if(window.requestFileSystem) {
            window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, 
              
              // On success callback
              function(parent_dir){
                
                console.log("successfully accessing LocalFileSystem.TEMPORARY");
                
                // creating an iStudi direcotry
                parent_dir.root.getDirectory("at.vsstoe-wien.istudi", {create: true, exclusive: false}, 
                
                // On create directory success
                function(dir){
                  
                  console.log("successfully created directory: " + dir.fullPath);
                  
                  // telling iOS, that we DONT want to backup the file in icloud  
                  dir.setMetadata(
  
                    // On set Metadata Success
                    function(){
                      
                      console.log("successfully setting the directories metadata.MobileBackup to 1");
                      
                      // when everything work's fine, we can call the callback function
                      cb(dir.fullPath);
                      
                    // On set Metaata Error
                    }, function(){
                      
                      console.log("error on setting the directories metadata.MobileBackup to 1");
                    }, { "com.apple.MobileBackup": 1}
                  );
                
                // On create directory error
                }, function(){
                  
                  console.log("error on creating directory");
                  
                });             
              
              // On error callback    
              }, function(){
                
                console.log("cannot access LocalFileSystem.TEMPORARY");
                
              }
            );
          } else {
            console.log("window.requestFileSystem is not set");
          }
        }, 
        
        /**
         * Downlaod a file.  
         * @param {Object} resource
         * @param {Object} object
         */
        download: function(resource, object, cb, callback) {
          var t = this;
          
          if(object.download_status != 100) {
            
            //@TODO: DOWNLOAD FILE
            if(FileTransfer) {
              console.log("FileTransfer is avaiable!");
              
              // create a new fileTransfer object
              var fileTransfer = new FileTransfer();
              var uri = encodeURI('http://istudi.2robots.at' + object.absolute_url);
              var target = t.filePath + '/' + resource + '_' + object.id + '.png';
              
              // download file
              fileTransfer.download(uri, target, 
                
                // on download succes
                function(entry){
                  console.log("file download success!");
                  console.log(entry.fullPath);
                  object.local_url = entry.fullPath;
                  object.download_status = 100;
                  t.objects.save();
                  
                  // telling iOS, that we DONT want to backup the file in icloud  
                  entry.setMetadata(
  
                    // On set Metadata Success
                    function(){
                      
                      console.log("successfully setting the directories metadata.MobileBackup to 0");
                      
                      // when everything work's fine, we can call the callback function
                      callback();
                      
                    // On set Metaata Error
                    }, function(){
                      
                      console.log("error on setting the directories metadata.MobileBackup to 0");
                    }, { "com.apple.MobileBackup": 1}
                  );
                }, 
                
                // on download error
                function(error){
                  console.log("ERROR on file download: " + error.code);
                }
              );
              
              fileTransfer.onprogress = function(progressEvent) {
                object.download_status = (progressEvent.loaded / progressEvent.total) * 100;
                t.objects.save();
                cb();
              };
            }
          } else {
            callback();
          }
        }
      };
      
      downloadService.init();
      return downloadService;
    };
  });
});