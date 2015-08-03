jest.dontMock('../Classes/TeamDetailStore');
jest.dontMock('../../utils/resources');
jest.dontMock('../Classes/Store');
jest.dontMock('object-assign');
jest.dontMock('backbone');
jest.dontMock('lodash');

describe('TeamDetailStore', function() {

  var TeamDetailStore, Store,
    resources,
    Backbone;


  beforeEach(function() {
    TeamDetailStore = require('../Classes/TeamDetailStore');
    Store = require('../Classes/Store')
    resources = require('../../utils/resources');
    Backbone = require('backbone');
    Backbone.$ = require('jquery');

  });

  it('should add a team model if it does not exits', function() {
    var team = {
      name: 'foo',
      get: function() {
        return this.name
      },
      fetch: function() {
        return this;
      }
    };

    var store = new TeamDetailStore(team);
    var action = {
      actionType: 'REFRESH_TEAM_DETAILS',
      teamName: 'bar'
    };
    var actionToCall = store.actions.REFRESH_TEAM_DETAILS;
    actionToCall.call(store, action)
    expect(store.models.length).toBe(2);

  });

});
