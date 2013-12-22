
angular.module('istudi.models', [], function($provide){
	$provide.factory('$models', function($http){
		return function(resource) {

      var iStudiModelArray = [];
      
      /**
       * init method
       */
      iStudiModelArray.init = function(resource) {
        this.endpoint = 'http://istudi.2robots.at/';
        this.resource = resource;
        this.map = [];

        // load data from localStorage
        this.load();
      };
      
      /**
       * load data from localStorage
       */
      iStudiModelArray.load = function() {
        var t = this;

        // clear this Array
        this.length = 0;

        // load data from localStorage
        var items = JSON.parse(window.localStorage.getItem("iStudiModelArray_" + this.resource));
        
        if(items != undefined && items != null) {
          
          // push items into this object
          items.forEach(function(item){
            item.$$hashKey = undefined;
            t.push(item);
  
            // generate a map for fast finding objects
            if(item.id != undefined && item.id != null) {
              if(t.map[item.id] == undefined) {
                t.map[item.id] = t.length-1;
              }
            }
          });
        }
      };
      
      /**
       * save data to localSotrage
       */
      iStudiModelArray.save = function() {
        var items = [];
        this.forEach(function(item){
          items.push(item);
        });

        window.localStorage.setItem("iStudiModelArray_" + this.resource, JSON.stringify(items));
      };
      
      
      /**
       * returns an string for passing selected groups
       */
      iStudiModelArray.groupsParams = function() {
        var groups = JSON.parse(window.localStorage.getItem("iStudiModelArray_groups"));
        
        if(groups == null) {
          groups = [];
        }
        
        var str = "";
        
        groups.forEach(function(g){
          if(g.value === true) {
            str += 'groups[]=' + g.id + '&'; 
          }
        });
        
        str = str.substr(0, str.length-1);
        return str;
      };

      /**
       * call refresh, to get the newest data from server. 
       */
      iStudiModelArray.refresh = function(callback, silent_refresh){
        
        var t = this;
        
        var params = "";
        if(this.resource != "groups") {
          params = "?" + this.groupsParams(); 
        }
        
        var time_start = new Date().getTime();
        
        $http({method: 'GET', url: this.endpoint + this.resource + '.json' + params}).
        success(function(data, status, headers, config) {
          
          // for each element from server
          data.forEach(function(item){
            
            var l_item = t.find(item.id); 
            
            // if we dont have an item with this id, just save it
            if(l_item == undefined || l_item == null) {
              t.push(item);
              
              // generate a map for fast finding objects
              if(t.map[item.id] == undefined) {
                t.map[item.id] = t.length-1;
              }
            
            // if we have an item with this id, we have to compare updated_at values 
            } else {

              if(item.updated_at > l_item.updated_at) {
                Object.keys(item).forEach(function(key){
                   t[t.map[item.id]][key] = item[key];
                });
                
                // if this is an object with a file, we need to tell the
                // downloadmanager to download the new file.
                if(t[t.map[item.id]]['download_status'] != undefined &&
                t[t.map[item.id]]['download_status'] != null ) {
                  t[t.map[item.id]]['download_status']  = 0;
                } else {
                  if(t[t.map[item.id]]['absolute_url'] != undefined &&
                    t[t.map[item.id]]['absolute_url'] != null) {
                      t[t.map[item.id]]['download_status']  = 0;    
                    }
                }
              }
            }
          });
          
          // save changes to localStorage
          t.save();
          
          // for better UX show the loading animation at least for 500 ms.
          var time_elapsed = new Date().getTime() - time_start;
          if(time_elapsed < 500 && !silent_refresh) {
            setTimeout(function(){
              callback();
            }, 500 - time_elapsed);
          } else {
            callback();
          }
        }).
        
        error(function(data, status, headers, config) {
          // for better UX show the loading animation at least for 500 ms.
          var time_elapsed = new Date().getTime() - time_start;
          if(time_elapsed < 500 && !silent_refresh) {
            setTimeout(function(){
              callback();
            }, 500 - time_elapsed);
          } else {
            callback();
          }       
        });
      };

      /**
       * find an item by it's id. 
       */
      iStudiModelArray.find = function(id){
        return this[this.map[id]];
      };
      
      
      
      
      iStudiModelArray.init(resource);
      return iStudiModelArray;
		};
	});
});