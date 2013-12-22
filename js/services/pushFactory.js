
angular.module('istudi.push', [], function($provide){
  $provide.factory('$push', function($http){
    return function() {
      
      var pushService = {
        
        GCM_sender_id: "", 
                
        /**
         * initialize downloadService
         */
        init: function() {
          
          // create a pushNotification object
          if(window.plugins && window.plugins.pushNotification) {
            this.pushNotification = window.plugins.pushNotification; 
          }
          
          // get push status from localStorage
          this.loadStatus();
          
          // if we don't have a push status object, we need to register
          if(this.status == null) {
            this.status = {token: null, registered: false, type: null};
            this.register();
          }
          
          // create global notification Handler functions
          
          /**
           * get called by cordova, when receiving Google Push message. 
           */
          window.onNotificationGCM = function(e) {
            console.log(e);
          };
          
          /**
           * get called by cordova, when receiving iOS Push message. 
           */
          window.onNotificationAPN = function(e) {
            console.log(e);
          };
        }, 
        
        /**
         * Successhandler, when requesting the deivceToken on iOS
         */
        iOSSuccess: function(result) {
          console.log(result);
          
          // set token
          this.status.type = "ios";
          this.status.token = null;
          
          // save the new status to localStorage
          this.save();
        }, 
        
        /**
         * Errorhandler, when requesting the deivceToken on iOS
         */
        iOSError: function(error) {
          console.log(error);
        }, 
        
        /**
         * Successhandler, when requesting the deivceToken on Android
         */
        AndroidSuccess: function(result) {
          console.log(result);
          
          // set token
          this.status.type = "android";
          this.status.token = null;
          
          // save the new status to localStorage
          this.save();
        }, 
        
        /**
         * Errorhandler, when requesting the deivceToken on Android
         */
        AndroidError: function(error) {
          console.log(result);
        }, 
        
        /**
         * load status object from LocalStorage.
         */
        loadStatus: function() {
          this.status = JSON.parse(window.localStorage.getItem("iStudiModelArray_push"));
        },
        
        /**
         * save status object to LocalStorage.
         */
        saveStatus: function() {
          window.localStorage.setItem("iStudiModelArray_push", JSON.stringify(this.status));
        }, 
        
        /**
         * Register this device for push notifications on the istudi server. 
         * This must be called, everytime user's selected groups change.
         */
        registerServer: function() {
          
          // if we have a token
          if(this.status != null) {
            if(this.status.token != null) {
              
              var t = this;
              var groups = [];
              var g = JSON.parse(window.localStorage.getItem("iStudiModelArray_groups"));
        
              if(g != null) {
                g.forEach(function(group){
                  if(group.value === true) {
                    groups.push(group.id) 
                  }
                });
              }
              
              var url = "http://istudi.2robots.at/device_tokens";
              var data = {
                token: this.status.token, 
                type: this.status.type, 
                groups: groups, 
              };
              
              $http({method: 'POST', url: url, data: data}).
              success(function(data, status, headers, config) {
                t.save();
              })
              .error(function(data, status, headers, config) {
                console.log("ERROR: pushServoce.registerServer");
              });
            }
          }
        }, 
        
        /**
         * Register this device for push notifications
         */
        register: function() {

          // ANDROID
          if(window.device) {
            if (window.device.platform == "Android") {
              this.pushNotification.register(this.AndroidSuccess, this.AndroidError, {
                "senderID":GCM_sender_id,
                "ecb":"onNotificationGCM"
              });
            }
            
            // IOS
            else if(window.device.platform == 'iOS') {
              this.pushNotification.register(this.iOSSuccess, this.iOSError, {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPN"
              });
            }
          }
        }, 

      };
      
      pushService.init();
      return pushService;
    };
  });
});