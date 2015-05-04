jest.dontMock('../TeamActions')
    .dontMock('flux');

describe('TeamActions', function() {
  var AppDispatcher,
      TeamActions;

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher.js');
    TeamActions = require('../TeamActions');
    spyOn(AppDispatcher, 'dispatch')
  });

  it('it should dispatch a team create action', function() {
    var opts = {teamName: 'rigatoni'};
    TeamActions.create(opts);
    opts = {teamName: 'rigatoni', actionType: 'TEAM_CREATE'};
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith(opts);
  });

  it('it should dispatch a add member action', function() {
    var opts = {id: 1, roleName: 'bosswoman', userId: 2};
    TeamActions.addMember(opts);
    opts = {id: 1, roleName: 'bosswoman', userId: 2, actionType: 'TEAM_ADD_MEMBER'};
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith(opts);
  });

  it('it should dispatch a remove member action', function() {
    var opts = {id: 1, roleName: 'bosswoman', userId: 2};
    TeamActions.removeMember(opts);
    opts = {id: 1, roleName: 'bosswoman', userId: 2, actionType: 'TEAM_REMOVE_MEMBER'};
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith(opts);
  });

  it('it should dispatch a add asset action', function() {
    var opts = {id: 1, resourceName: 'bosswoman', assetData: 'capellini'};
    TeamActions.addAsset(opts);
    opts.actionType = 'TEAM_ADD_ASSET';
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith(opts);
  });

  it('it should dispatch a remove asset action', function() {
    var opts = {id: 1, resourceName: 'bosswoman', assetId: 2};
    TeamActions.removeAsset(opts);
    opts.actionType = 'TEAM_REMOVE_ASSET';
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith(opts);
  });

});
