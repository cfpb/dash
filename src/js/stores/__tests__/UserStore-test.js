jest.dontMock('../Classes/UserStore');
jest.dontMock('../Classes/Store');
jest.dontMock('object-assign');


describe('UserStore', function() {

  var UserStore, Backbone, common, sinon;


  beforeEach(function() {
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    UserStore = require('../Classes/UserStore');
    common = require('../../utils/common');

  });
  describe('Users Store', function() {
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
  it('contain actions', function() {
    var result = new UserStore({id: '1', name: 'foo'});
    expect(result.first().actions.USER_DATA).toBeDefined();
  });
  it('should call common.userData, when USER_DATA action is invoked', function() {
    var user = {
        name: 'Dragon'
      };

    var store = new UserStore(user);
    var model = store.models[0];
    var action = model.actions.USER_DATA;
    spyOn(common, 'userData').andReturn({
      done: function( cb ) {
        cb({id: '123', name: 'foo', updatedKey: 'bar'})
      }
    });
    action.call(model, 'USER_DATA');

    expect(common.userData).toHaveBeenCalled();
    expect(model.get('updatedKey')).toEqual('bar');

  });
  it('should get teams from team store', function(){
    var teamStore = require('../teamStore');
    var user = {
      name: 'cheesy'
    };
    var store = new UserStore(user);
    var model = store.models[0];
    spyOn(teamStore, 'userTeams');
    model.getTeams()
    expect(teamStore.userTeams).toHaveBeenCalledWith(user.name);
  });

});
