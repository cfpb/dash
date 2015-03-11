jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../TeamStore');
jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamStore,
    common;

  beforeEach(function() {
    TeamStore = require('../TeamStore');
    common = require('../../utils/common');
  });

  it('should call common to get all teams', function() {
    TeamStore.getAll();
    expect(common.getAllTeams).toBeCalled();
  });

  it('should filter all teams and user teams correctly', function() {
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
    expect(otherUserTeam.otherTeams.length).toEqual(5);
  });
});
