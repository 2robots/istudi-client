
define(['collections/_collection'], function(_collection) {

  return _collection.extend({

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
    },

    comparator: function(m) {
      return m.get("position");
    }
  });

});