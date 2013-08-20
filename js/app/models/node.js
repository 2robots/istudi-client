
define(function() {
  return Backbone.Model.extend({

    initialize: function() {
    },

    initializeRelationships: function() {

      // add this to a group
      var group = this.collection.app.groups.get(this.get("group_id"));
      var an = group.get("all_nodes");
      var rn = group.get("root_nodes");

      if(typeof(an) == "undefined") {
        an = [];
      }

      if(typeof(rn) == "undefined") {
        rn = [];
      }

      // add this to it's parent, if there is one
      if(this.get("ancestry") != null) {
        var parent = this.collection.get(this.get("ancestry"));
        var d = parent.get("data");

        if(typeof(d) == "undefined") {
          d = [];
        }

        d.push(this);
        parent.set("data", d);

      // if this is a root_node, add it to the group
      } else {
        rn.push(this);
        group.set("root_nodes", rn);
      }

      an.push(this);
      group.set("all_nodes", an);
    }
  });
});