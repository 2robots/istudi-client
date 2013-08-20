
define(['collections/_collection', 'models/node'], function(_collection, Model) {

  return _collection.extend({
    model: Model,
    resource: 'nodes',
    defaultView: 'index',

    addUrlParameters: function() {

      var ret = "";
      var counter = 0;
      this.app.groups.each(function(group){

        // if this group is checked
        if(group.checked()) {
          if(counter > 0) {
            ret += "&";
          }

          counter++;
          ret += 'groups[]=' + group.id;
        }
      });

      return ret;
    }
  });

});