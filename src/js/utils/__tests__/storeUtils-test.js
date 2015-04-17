jest.dontMock('../storeUtils');

describe('storeUtils functions tests', function() {
  it('should handle actions', function() {
    var storeUtils = require('../storeUtils');
    var handler = function() {
      return 'sandwich'
    };

    storeUtils.actions = {foo: handler};
    var action = {actionType: 'foo'};
    var test = storeUtils.handleAction(action);
    expect(test).toBe('sandwich');

  });
});
