
define(['collections/_contentCollection', 'models/node'], function(_contentCollection, Model) {

  return _contentCollection.extend({
    model: Model,
    resource: 'nodes',
    defaultView: 'index'
  });

});