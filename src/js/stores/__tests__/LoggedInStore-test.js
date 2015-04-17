jest.dontMock('../LoggedInStore');
jest.dontMock('object-assign');

describe('LoggedInStore', function() {
  var LoggedInStore,
    Backbone;

  beforeEach(function() {
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    LoggedInStore = require('../LoggedInStore');
  });

  it('should get logged in user', function() {
    spyOn(LoggedInStore.prototype, 'fetch');
    var result = new LoggedInStore();
    expect(result.fetch).toHaveBeenCalled();
  });
});
