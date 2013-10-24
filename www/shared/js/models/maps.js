
istudi.maps = function(params) {

  var endpoint = "/maps.json?" + istudi.checkedUnis("param");
  var localKey = "maps";

  var mapping = function(items) {

    if(items == undefined || items == null) {
      items = [];
    }
    var newItems = [];
    var mapped = $.map(items, function (data) {
      newItems.push({
        title: data.title,
        absolute_url: data.absolute_url,
        position: data.position,
        active: data.active,
        id: data.id
      });
    });

    return newItems;
  };

  // create the viewModel for knockout.template
  return istudi.genericViewModel(mapping, localKey, endpoint);
};