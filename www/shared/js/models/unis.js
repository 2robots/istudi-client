
istudi.unis = function(params) {

  var endpoint = "/groups.json";
  var localKey = "unis";

  var mapping = function(items) {
    if(items == undefined || items == null) {
      items = [];
    }
    var newItems = [];
    var mapped = $.map(items, function (data) {
      newItems.push({
        title: data.title,
        active: data.active,
        id: data.id,
        position: data.position,
        checked: ko.observable(false, {persist: 'settings.uni.' + data.id})
      });
    });

    return newItems;
  };

  // create the viewModel for knockout.template
  return istudi.genericViewModel(mapping, localKey, endpoint);
};