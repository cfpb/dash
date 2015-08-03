jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../Classes/TeamStore');
jest.dontMock('../Classes/Store');
jest.dontMock('lodash');
jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamStore,
    common,
    callback,
    AppDispatcher,
    Backbone,
    listener,
    _,
    userStore,
    loggedInUserStore;

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

  var team = {
    id: '123',
    name: 'foo'
  };

  beforeEach(function() {
    _ = require('lodash');
    TeamStore = require('../Classes/TeamStore');
    common = require('../../utils/common');
    userStore = require('../userStore')
    loggedInUserStore = require('../loggedInUserStore')
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
    team = {
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

    spyOn(common, 'teamCreate').andReturn({
      done: function( cb ) {
        cb({})
      }
    });
    action.call(teamStore, TEAM_CREATE);

    expect(common.teamCreate).toHaveBeenCalled();
    expect(teamStore.get('foo').get('id')).toEqual('cheesy');
  });

  it('should make a call to common for all model actions and update the model with the result', function() {
    var store = new TeamStore(team);
    var teamModel = store.models[0];

    var actionHash = {
      TEAM_ADD_MEMBER: 'teamAddMember',
      TEAM_REMOVE_MEMBER: 'teamRemoveMember',
      TEAM_ADD_ASSET: 'teamAddAsset',
      TEAM_REMOVE_ASSET: 'teamRemoveAsset'
    }

    _.forIn(teamModel.actions, function( value, key ) {
      var action = teamModel.actions[key];

      teamModel.trigger = function noop() {
      };

      spyOn(common, actionHash[key]).andReturn({
        done: function( cb ) {
          cb({id: '123', name: 'foo', updatedKey: 'bar'})
          return {
            always: function() {
            }
          }
        }
      });

      action.call(teamModel, key)

      expect(common[actionHash[key]]).toHaveBeenCalled();
      expect(teamModel.get('updatedKey')).toEqual('bar');
    });
  });

  it('should sort members by role', function() {
    team.roles = {
      'member': {
        'members': []
      },
      'admin': {
        'members': []
      }
    };

    var store = new TeamStore(team);
    var teamModel = store.models[0];
    spyOn(userStore, 'filter').andCallFake(
      function( user ) {
        return [];
      });
    var result = teamModel.getMembersSortedByRole();

    expect(result.member).not.toBeUndefined();
    expect(result.admin).not.toBeUndefined();

  });
  it('should get non members by role', function() {
    team.roles = {
      'member': {
        'members': [
          '34af6d5a6e7ade14b3b1f46aa500264e',
          '34af6d5a6e7ade14b3b1f46aa5006524',
          '34af6d5a6e7ade14b3b1f46aa501a80a',
          '34af6d5a6e7ade14b3b1f46aa501c078',
          'b57e1ae2e9d7cbf724cd77c76b07f33c',
          'b57e1ae2e9d7cbf724cd77c76b0827b5',
          'b57e1ae2e9d7cbf724cd77c76b0a65de'
        ]
      },
      'admin': {
        'members': [
          '34af6d5a6e7ade14b3b1f46aa500264e',
          '34af6d5a6e7ade14b3b1f46aa5006524',
          '34af6d5a6e7ade14b3b1f46aa501a80a',
          '34af6d5a6e7ade14b3b1f46aa501c078',
          'b57e1ae2e9d7cbf724cd77c76b07f33c',
          'b57e1ae2e9d7cbf724cd77c76b0827b5',
          'b57e1ae2e9d7cbf724cd77c76b0a65de']
      }
    };

    var store = new TeamStore(team);
    var teamModel = store.models[0];
    spyOn(userStore, 'filter').andCallFake(
      function( user ) {
        return [
          '34af6d5a6e7ade14b3b1f46aa500264e',
          '34af6d5a6e7ade14b3b1f46aa5006524',
          '34af6d5a6e7ade14b3b1f46aa501a80a',
          '34af6d5a6e7ade14b3b1f46aa501c078',
          'b57e1ae2e9d7cbf724cd77c76b07f33c',
          'b57e1ae2e9d7cbf724cd77c76b0827b5',
          'b57e1ae2e9d7cbf724cd77c76b0a65de'];
      });
    var members = teamModel.getNonMembersByRole('member');
    var admins = teamModel.getNonMembersByRole('admin');

    expect(members).not.toBeUndefined();
    expect(admins).not.toBeUndefined();

  });

  it('should return my team correctly', function() {
    team.roles = {
      'member': {
        'members': [
          '34af6d5a6e7ade14b3b1f46aa500264e',
          '34af6d5a6e7ade14b3b1f46aa5006524',
          '34af6d5a6e7ade14b3b1f46aa501a80a',
          '34af6d5a6e7ade14b3b1f46aa501c078',
          'b57e1ae2e9d7cbf724cd77c76b07f33c',
          'b57e1ae2e9d7cbf724cd77c76b0827b5',
          'b57e1ae2e9d7cbf724cd77c76b0a65de'
        ]
      },
      'admin': {
        'members': [
          '34af6d5a6e7ade14b3b1f46aa500264e',
          '34af6d5a6e7ade14b3b1f46aa5006524',
          '34af6d5a6e7ade14b3b1f46aa501a80a',
          '34af6d5a6e7ade14b3b1f46aa501c078',
          'b57e1ae2e9d7cbf724cd77c76b07f33c',
          'b57e1ae2e9d7cbf724cd77c76b0827b5',
          'b57e1ae2e9d7cbf724cd77c76b0a65de']
      }
    };
    var store = new TeamStore(team);
    loggedInUserStore.id = '34af6d5a6e7ade14b3b1f46aa500264e';

    var result = store.myTeams();
    expect(store.models[0]).toEqual(result[0]);
  });
  xit('should respond to dispatcher action calls', function() {
    callback(TEAM_ADD_MEMBER);
  });

});
