jest.dontMock('../Classes/LoggedInStore');
jest.dontMock('../Classes/Store');
jest.dontMock('object-assign');

describe('LoggedInStore', function() {
  var LoggedInStore,
    Backbone,
    server;

  beforeEach(function() {
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    LoggedInStore = require('../Classes/LoggedInStore');
  });

  it('should get logged in user', function() {
    spyOn(LoggedInStore.prototype, 'fetch');
    var result = new LoggedInStore();
    expect(result.fetch).toHaveBeenCalled();
  });

  it('should return true when used model is loggedIn', function() {
    /*eslint-disable */
    var user = {
      name: 'spongey',
      loggedIn: true
    };
    /*eslint-enable */

    var store = new LoggedInStore(user);
    var result = store.isLoggedIn();

    expect(result).toBeTruthy();
  });
  it.only('should log member out on ajax error', function() {

    var user = {
      name: 'spongey',
      loggedIn: true
    };

    var store = new LoggedInStore(user);

    var result = store.isLoggedIn();
    console.log(result);
    //expect(result).toBeFalsy();


  });
});
