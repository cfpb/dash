jest.dontMock('../../constants/UserConstants');
jest.dontMock('../LoggedInUserStore');
jest.dontMock('object-assign');


describe('LoggedInUserStore', function() {

  var UserStore, Backbone;


  beforeEach(function() {
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    UserStore = require('../LoggedInUserStore');
  });
  describe('foo', function() {
    it('should get all users', function() {
      spyOn(UserStore.prototype, 'fetch');
      var result = new LoggedInUserStore();
      expect(result.fetch).toHaveBeenCalled();
    });
  });

  it('should get all users', function() {
    spyOn(UserStore.prototype, 'fetch');
    var result = new LoggedInUserStore();
    expect(result.fetch).toHaveBeenCalled();
  });

  //move to future storeUtils-test.js

});
