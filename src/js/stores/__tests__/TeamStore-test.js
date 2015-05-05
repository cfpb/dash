jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../Classes/TeamStore');
jest.dontMock('../Classes/Store');

jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamStore,
      common,
      callback,
      AppDispatcher,
      Backbone,
      listener;

  var TeamConstants = require('../../constants/TeamConstants')

  var actionTeamDestroy = {
    actionType: TeamConstants.TEAM_DESTROY,
    id: 'foo'
  };

  var TEAM_ADD_MEMBER = {
    id: 'foo',
    actionType: 'TEAM_ADD_MEMBER',
    orgName: 'foo replace',
    roleName: 'member',
    userId: 'GIJoe'
  };

  beforeEach(function() {
    TeamStore = require('../Classes/TeamStore');
    common = require('../../utils/common');
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    listener = jest.genMockFunction();
    AppDispatcher.register(listener);
  });

  it('should call common to get all teams', function() {
    spyOn(TeamStore.prototype, 'fetch');
    var result = new TeamStore();
    expect(result.fetch).toHaveBeenCalled();
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toEqual(1);
  });

  it('should create a team', function() {
    var team = {
      id: 'cheesy',
      name: 'foo'
    };
    var TEAM_CREATE = {
      actionType: 'TEAM_CREATE',
      id: 'foo',
      teamName: 'foo'
    };
    var teamStore = new TeamStore(team);
    var action = teamStore.actions.TEAM_CREATE;

    spyOn(common, 'teamCreate').andReturn({done: function(cb) {cb({})}});
    action.call(teamStore, TEAM_CREATE);

    expect(common.teamCreate).toHaveBeenCalled();
    expect(teamStore.get('foo').get('id')).toEqual('cheesy');
  });

  it('should make a call to common to add a member and update the model with the result', function() {
    var team = {
      id: '123',
      name: 'foo'
    };

    var store = new TeamStore(team);
    var teamModel = store.models[0];
    var action = teamModel.actions.TEAM_ADD_MEMBER;

    spyOn(common, 'teamAddMember').andReturn({done: function(cb) {cb({id: '123', name: 'foo', updatedKey: 'bar'})}});
    action.call(teamModel, 'TEAM_ADD_MEMBER')

    expect(common.teamAddMember).toHaveBeenCalled();
    expect(teamModel.get('updatedKey')).toEqual('bar')
  });

  xit('should respond to dispatcher action calls', function() {
    callback(TEAM_ADD_MEMBER);
  });

  xit('should add team name and id to the member object', function() {
    var team = {
      _id: '123',
      name: 'foo'
    };

    var member = {},
      members = [member];
    var result = TeamStore.addTeamNames(team, members);
    expect(result[0].teams[0].name).toBe(team.name);
    expect(result[0].teams[0]._id).toBe(team._id);
  });

  xit('should add team via model', function() {
    common.teamAddMember.mockImplementation(function() {
      return {
        done: function() {
        }
      };
    });
    callback(TEAM_ADD_MEMBER);
    expect(common.removeUser).toBeCalled();
  });

});
