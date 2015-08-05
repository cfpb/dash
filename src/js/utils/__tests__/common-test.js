jest.dontMock('../../utils/common');
var common, resources, $, userId;

beforeEach(function(){
  common = require('../../utils/common');
  resources = require('../../utils/resources');
  $ = require('jquery');
  userId = '123';
});


describe('Get all teams method', function(){
  it('should call the teams URL', function(){
    common.getAllTeams();
    expect($.get).toBeCalledWith(resources.routes.ALL_TEAMS);

  });
});

describe('User  and team functions/actions', function(){
  it('should call the correct routes when user actions are invoked', function(){

    var opts = {'foo': 'boo'};


    common.getAllUsers();
    expect($.get).toBeCalledWith(resources.routes.ALL_USERS);

    common.teamAddMember(opts);
    expect($.ajax).toBeCalled();

    common.teamRemoveMember(opts);
    expect($.ajax).toBeCalled();

    common.teamCreate();
    expect($.ajax).toBeCalled();

    common.teamRemoveAsset();
    expect($.ajax).toBeCalled();

    common.getCurrentUserInfo();
    expect($.get).toBeCalledWith(resources.routes.CURRENT_USER_INFO);

    common.teamAddAsset({assetData: 'foo'});
    expect($.ajax).toBeCalled();

    common.userData({userData: 'foo'});
    expect($.ajax).toBeCalled();

  });

});

describe('User manipulations', function(){
  it('should deactivate user', function(){
    resources.routes = {
      userActions: function(user){
        return '/kratos/users/' + userId
      }
    };
    common.deactivateUser(userId);
    expect($.ajax.mock.calls[0][0].url).toBe('/kratos/users/' + userId);
    expect($.ajax.mock.calls[0][0].type).toEqual('DELETE');

  });
  it('should reactivate user', function(){
    resources.routes = {
      userActions: function(user){
        return '/kratos/users/' + userId
      }
    };
    common.reactivateUser(userId);
    expect($.ajax.mock.calls[0][0].url).toBe('/kratos/users/' + userId);
    expect($.ajax.mock.calls[0][0].type).toEqual('PUT');

  });
});
