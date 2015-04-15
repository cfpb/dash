jest.dontMock('../../constants/UserConstants');
jest.dontMock('../UserStore');
jest.dontMock('object-assign');


describe('UserStore', function() {

  var UserStore, Backbone;


  beforeEach(function() {
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    UserStore = require('../UserStore');
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
  xit('should handle actions', function() {
    //spyOn(UserStore.prototype, 'fetch');


    var handler = function(){return 'sandwich'};
    var user = new UserStore();
    var action = {actionType: 'foo'};
    user.actions = {foo: handler};
    console.log(user);
    var test = user.handleAction(action);
    expect(test).toBe('sandwich');

  });
});
