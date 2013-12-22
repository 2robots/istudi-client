
window.istudi = {

  base: "http://istudi.2robots.at",

  // we need to know for each model, if it's pulled the first time
  firstTime: {
    unis: true
  },

  registerRoutes: function() {
    istudi.app.router.register(":view", {view: "news"});
    istudi.app.router.register(":view/:id", {view: undefined, id: undefined});

  },

  initialize: function() {
    // bind cordova.deviceready to this object
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  checkedUnis: function(type) {

    var ret = [];
    var retString = "";

    var items = JSON.parse(window.localStorage.getItem("unis"));

    if(items == undefined || items == null) {
      items = [];
    }

    $.each(items, function(){

      if(window.localStorage.getItem("settings.uni." + this.id) == "true") {
        if(type == "id") {
          ret.push(this.id);
        } else if(type == "param") {
          retString += "groups[]=" + this.id + "&";
        } else {
          ret.push(this);
        }
      }
    });

    if(type == "param") {
      return retString.substr(0, retString.length-1);
    } else {
      return ret;
    }
  },

  genericViewModel: function(mapping, localKey, endpoint) {
    return {
      dataSource: DevExpress.data.createDataSource({
        load: function(loadOptions) {
          var dfd = new $.Deferred();
          var items = mapping(JSON.parse(window.localStorage.getItem(localKey)));

          // if we want to refresh the list
          if(loadOptions.refresh) {

            // only load, when this is a real refresh, and not just the first load
            if(!istudi.firstTime.unis || items.length == 0) {

              // load items from server
              $.get(istudi.base + endpoint).done(function(result){
                items = mapping(result);
                window.localStorage.setItem(localKey, ko.toJSON(items));
                dfd.resolve(items);

              // When an error occures
              }).fail(function(){
                DevExpress.ui.notify({message: "Keine Verbindung.", shading: true, type: "error"});
                dfd.resolve(items);
              });

            // if this is the first refresh and there are already items
            // in the list: we jsut deliver local items
            } else {
              istudi.firstTime.unis = false;
              dfd.resolve(items);
            }

          // we dont want any update logic, just refresh
          } else {
            dfd.resolve([]);
          }

          // return all dfd.resolve-data
          return dfd.promise();
        }
      })
    };
  },

  onDeviceReady: function() {

    $(document).ready(function(){
      istudi.app = new DevExpress.framework.html.HtmlApplication({
        namespace: istudi,
        defaultLayout: "slideout",
        navigation: [
          {
            title: "Neuigkeiten",
            action: "#news",
            icon: "event"
          },
          {
            title: "Universität Wien",
            action: "#uni/1",
            icon: "home"
          },
          {
            title: "Lagepläne",
            action: "#maps",
            icon: "map"
          },
          {
            title: "Pocketcards",
            action: "#cards",
            icon: "bookmark"
          },
          {
            title: "Suche",
            action: "#search",
            icon: "find"
          },
          {
            title: "Einstellungen",
            action: "#settings",
            icon: "preferences"
          }
        ]
      });

      //Switch to the iOS theme
      var devices = DevExpress.devices,
          iosVersion = devices.iosVersion();
      if(devices.current().platform === "ios" && iosVersion && iosVersion[0] === 7)  {
          $(".dx-viewport")
              .removeClass("dx-theme-ios")
              .addClass("dx-theme-ios7");
      }

      istudi.registerRoutes();
      istudi.app.navigate();
    });
  }
};

istudi.initialize();