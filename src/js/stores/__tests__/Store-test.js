jest.dontMock('backbone');
jest.dontMock('../Classes/Store');


describe('ModelStore', function() {
  it('should handle actions defined in ModelStore.actions', function() {
    var ModelStore = require('../Classes/Store').Model;
    spyOn(ModelStore.prototype, 'fetch');
    var modelStore = new ModelStore();
    var handler = function() {
      return 'salami'
    };
    modelStore.actions = {sandwich: handler};
    var action = {actionType: 'sandwich'};
    var test = modelStore.handleAction(action);
    expect(test).toBe('salami');
  });

});

describe('CollectionStore', function() {
  it('should handle actions defined in ModelStore.actions if there is no id', function() {
    var CollectionStore = require('../Classes/Store').Collection;
    spyOn(CollectionStore.prototype, 'fetch');
    var collectionStore = new CollectionStore();

    var handler = function() {
      return 'salami'
    };

    collectionStore.actions = {sandwich: handler};
    var action = {actionType: 'sandwich'};
    var test = collectionStore.handleAction(action);
    expect(test).toBe('salami');

  });

  it('should handle actions defined in CollectionStore.Model.actions, if the action has an `id`', function() {
    var Store = require('../Classes/Store')
    spyOn(Store.Collection.prototype, 'fetch');
    var Model = Store.backbone.Model.extend({
      actions: {
        sandwich: function() {
          return 'salami';
        }
      }
    });
    var CollectionStore = Store.Collection.extend({model: Model});
    var collectionStore = new CollectionStore();
    var model = collectionStore.add({id: 1});
    spyOn(model.actions, 'sandwich');

    var action = {actionType: 'sandwich', id: 1};
    collectionStore.handleAction(action);
    expect(collectionStore.models[0].actions.sandwich).toHaveBeenCalled();
  });

});

