
angular.module('istudi.download', [], function($provide){
  $provide.factory('$download', function($http){
    return function() {
      
      var downloadService = {
        
        queue: [], 
        objects: null, 
        
        /**
         * initialize downloadService
         */
        init: function() {
        }, 
        
        /**
         * add an object to the downlaod queue. 
         * @param {Object} resource
         * @param {Object} object
         */
        add: function(resource, object, cb) {
          object.download_status = 0;
          this.queue.push({resource: resource, object: object});
          this.run(cb);
        }, 
        
        /**
         * add a collection of items to the queue
         */
        addAll: function(resource, objects, cb) {
          
          var t = this;
          this.objects = objects;
          
          objects.forEach(function(o){
            
            if(o.download_status == undefined || o.download_status == null) {
              o.download_status = 0;  
            }
            t.queue.push({resource: resource, object: o});  
          });

          this.run(cb);
        }, 
        
        /**
         * run the queue
         */
        run: function(cb) {
          
          var t = this;
          
          // if there are items in the queue
          if(this.queue.length > 0) {
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
         * Downlaod a file.  
         * @param {Object} resource
         * @param {Object} object
         */
        download: function(resource, object, cb, callback) {
          var t = this;
          
          if(object.download_status != 100) {
            
            //@TODO: DOWNLOAD FILE
            object.local_url = 'http://istudi.2robots.at' + object.absolute_url;
            
            for(var i = 0; i < 100; i++) {
              setTimeout(function(){
                object.download_status++;
                t.objects.save();
                cb();
                
                if(object.download_status == 100) {
                  // save the objects collection to localStorage
                  t.objects.save();
                  callback();
                } 
              }, 10);  
            }
          }
        }
      };
      
      downloadService.init();
      return downloadService;
    };
  });
});