
istudi.nodes = function(params) {

  var endpoint = "/nodes.json?" + istudi.checkedUnis("param");
  var localKey = "nodes";

  var mapping = function(items) {

    if(items == undefined || items == null) {
      items = [];
    }
    var newItems = [];
    var mapped = $.map(items, function (data) {
      newItems.push({
        title: data.title,
        ancestry: data.ancestry,
        position: data.position,
        group_id: data.group_id,
        content: data.content,
        active: data.active,
        id: data.id
      });
    });

    return newItems;
  };

  // create the viewModel for knockout.template
  return istudi.genericViewModel(mapping, localKey, endpoint);
};