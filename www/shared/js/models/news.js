
istudi.news = function(params) {

  var endpoint = "/news.json?" + istudi.checkedUnis("param");
  var localKey = "news";

  var mapping = function(items) {
    if(items == undefined || items == null) {
      items = [];
    }
    var newItems = [];
    var mapped = $.map(items, function (data) {
      newItems.push({
        title: data.title,
        date: data.date,
        groups: data.groups,
        active: data.active,
        id: data.id
      });
    });

    return newItems;
  };

  // create the viewModel for knockout.template
  return istudi.genericViewModel(mapping, localKey, endpoint);
};