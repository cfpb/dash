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
    _;

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

  it('should make a call to common to for all model actions and update the model with the result', function() {
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

      spyOn(common, actionHash[key]).andReturn({
        done: function( cb ) {
          cb({id: '123', name: 'foo', updatedKey: 'bar'})
        }
      });
      action.call(teamModel, key)

      expect(common[actionHash[key]]).toHaveBeenCalled();
      expect(teamModel.get('updatedKey')).toEqual('bar');
    });
  });

  xit('should respond to dispatcher action calls', function() {
    callback(TEAM_ADD_MEMBER);
  });

});
