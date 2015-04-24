jest.dontMock('../../constants/UserConstants');
jest.dontMock('../Classes/UserStore');
jest.dontMock('../Classes/Store');
jest.dontMock('object-assign');


describe('LoggedInUserStore', function() {

  var UserStore, Backbone;


  beforeEach(function() {
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    UserStore = require('../Classes/UserStore');
  });
  describe('foo', function() {
    it('should get all users', function() {
      spyOn(UserStore.prototype, 'fetch');
      var result = new UserStore();
      expect(result.fetch).toHaveBeenCalled();
    });
  });

  it('should get all users', function() {
    spyOn(UserStore.prototype, 'fetch');
    var result = new UserStore();
    expect(result.fetch).toHaveBeenCalled();
  });

  //move to future storeUtils-test.js

});
