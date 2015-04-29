jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../Classes/TeamStore');
jest.dontMock('../Classes/Store');

jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamStore,
    common,
    callback,
    AppDispatcher,
    Backbone;
  var TeamConstants = require('../../constants/TeamConstants')

  var actionTeamDestroy = {
    actionType: TeamConstants.TEAM_DESTROY,
    id: 'foo'
  };
  var actionTeamCreate = {
    actionType: TeamConstants.TEAM_CREATE,
    id: 'foo'
  };
  var removeUser = {
    actionType: TeamConstants.TEAM_REMOVE_USER_START,
    payload: {orgName: 'foo replace'}
  };
  var addUser = {
    actionType: TeamConstants.TEAM_ADD_USER_START
  };


  beforeEach(function() {
    TeamStore = require('../Classes/TeamStore');
    common = require('../../utils/common');
    Backbone = require('backbone');
    Backbone.$ = require('jquery');
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    var listener = jest.genMockFunction();
    AppDispatcher.register(listener);
    // callback = listener.mock.calls[0][0];
  });

  it('should call common to get all teams', function() {
    spyOn(TeamStore.prototype, 'fetch');
    var result = new TeamStore();
    expect(result.fetch).toHaveBeenCalled();
  });
  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should create team', function() {
    spyOn(TeamStore.prototype, 'fetch');
    var result = new TeamStore();
    common.teamCreate.mockImplementation(function() {
      return {
        done: function() {
        }
      };
    });
    result.createTeam(actionTeamDestroy)
    expect(common.teamCreate).toBeCalled();
  });

  xit('should filter all teams and user teams correctly', function() {
    var currentUser = {name: 'im'},
      otherUser = {name: 'cc'},
      teams = [
        {id: 'team-with-non-unique-members', roles: {member: {members: ['im', 'cm', 'im']}}},
        {id: 'empty-team', roles: {member: {members: []}}},
        {id: 'non-current-user-team', roles: {member: {members: ['cm']}}},
        {id: 'happy-path-team', roles: {member: {members: ['im', 'cm']}}}
      ]
    var result = TeamStore.getFilteredTeams(teams, currentUser),
      otherUserTeam = TeamStore.getFilteredTeams(teams, otherUser);

    expect(result.myTeams.length).toEqual(2);
    expect(result.myTeams).toContain(teams[0]);
    expect(result.myTeams).toContain(teams[3]);

    expect(otherUserTeam.myTeams.length).toEqual(0);
    expect(otherUserTeam.otherTeams.length).toEqual(4);
  });

  xit('should extract assets from teams', function() {

    /* eslint-disable */
    var team = {
      rsrcs: {
        gh: {
          assets: [
            {
              id: 'id-1',
              gh_id: 1,
              name: 'repo_name',
              full_name: 'url/repo_name'
            },
            {
              id: 'id-2',
              gh_id: 2,
              name: 'repo_name2',
              full_name: 'url/repo_name2'
            }
          ]
        }
      }
    };
    /* eslint-enable */

    var result = TeamStore.getTeamAssets(team);

    expect(result.length).toEqual(2);
    expect(result).toContain(team.rsrcs.gh.assets[0]);

  });

  xit('should produce team metadata', function() {
    /* eslint-disable */
    var currUserId = '1234',
      currUser = {name: currUserId};
    var users = [currUser];
    var team = {
      name: "foo",
      roles: {
        member: {members: [currUserId]},
        admin: {members: [currUserId]}
      }
    };
    /* eslint-enable */

    var result = TeamStore.constructTeamAndUserMetadata(team, users, currUserId);
    expect(result.userMembers.length).toEqual(1);
    expect(result.adminMembers.length).toEqual(1);
    expect(result.roles.member).toBeTruthy();
    expect(result.roles.admin).toBeTruthy();
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


  xit('should make a request to delete a user', function() {

    var done = jest.genMockFunction().mockImplementation(function() {
      return '';
    });
    common.removeUser.mockImplementation(function() {
      return {
        done: function() {
        }
      };
    });
    callback(removeUser);
    expect(common.removeUser).toBeCalled();
  });
  xit('should make a request to add a user', function() {


    common.addUser.mockImplementation(function() {
      return {
        done: function() {
        }
      };
    });
    callback(addUser);
    expect(common.addUser).toBeCalled();
  });

});
