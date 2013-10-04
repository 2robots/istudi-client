
define(['collections/nodes'], function(nodes) {
  return Backbone.Model.extend({

    idAttribute: "id",

    initialize: function() {
    },

    initializeRelationships: function() {

      // add this to a group
      var group = this.collection.app.groups.get(this.get("group_id"));

      if(typeof(group) != "undefined") {
        var an = group.get("all_nodes");
        var rn = group.get("root_nodes");

        if(typeof(an) == "undefined" || typeof(an.each) == "undefined") {
          an = new Backbone.Collection();
        }

        if(typeof(rn) == "undefined" || typeof(rn.each) == "undefined") {
          rn = new Backbone.Collection();
        }
      }

      // add this to it's parent, if there is one
      if(this.get("ancestry") != null) {
        var parent = this.collection.get(this.get("ancestry"));
        var d = parent.get("data");

        if(typeof(d) == "undefined" || typeof(d.each) == "undefined") {
          d = new Backbone.Collection();
        }

        d.push(this);
        parent.set("data", d);


      // if this is a root_node, add it to the group
      } else {
        if(typeof(group) != "undefined") {
          rn.push(this);
          group.set("root_nodes", rn);
        }
      }

      if(typeof(group) != "undefined") {
        an.push(this);
        group.set("all_nodes", an);
      }
    }
  });
});