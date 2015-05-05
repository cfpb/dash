jest.dontMock('../TeamsPage.jsx')
  .dontMock('react-breadcrumbs');

var TeamsPage = require('../TeamsPage.jsx');

describe('Page of teams', function() {
  var React,
    TestUtils,
    teams;
  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    /* eslint-disable */
    teams = {
      models: [
        {
          get: function(name) {
            return this.name;
          },
          name: 'foo1',
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
          },
          roles: {
            member: {
              members: [
                'c7a9d8c1c0516c0910f7b2013e004675',
                'c7a9d8c1c0516c0910f7b2013e00d518',
                'c7a9d8c1c0516c0910f7b2013e02bd9d'
              ]
            },
            admin: {
              members: [
                'c7a9d8c1c0516c0910f7b2013e004675',
                'c7a9d8c1c0516c0910f7b2013e00d518',
                'c7a9d8c1c0516c0910f7b2013e02bd9d'
              ]
            }
          }
        },
        {
          get: function( name ) {
            return 'foo'
          },
          name: 'foo2',
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
          },
          roles: {
            member: {
              members: [
                'c7a9d8c1c0516c0910f7b2013e004675',
                'c7a9d8c1c0516c0910f7b2013e00d518',
                'c7a9d8c1c0516c0910f7b2013e02bd9d'
              ]
            },
            admin: {
              members: [
                'c7a9d8c1c0516c0910f7b2013e004675',
                'c7a9d8c1c0516c0910f7b2013e00d518',
                'c7a9d8c1c0516c0910f7b2013e02bd9d'
              ]
            }
          }
        }
      ]
    };
    /* eslint-enable */

  });
  it('should contain some teams and should AddAsset component', function() {
    var loggedInUser = {
      get: function( param ) {
        return {

          team: {
            add: true,
            remove: true
          }

        };
      }
    };

    var teamList = TestUtils.renderIntoDocument(
      <TeamsPage teams={teams} loggedInUser={loggedInUser} />
    );

    var teamsPageComponent = TestUtils.scryRenderedDOMComponentsWithClass(teamList, 'teams')[0].props.children;
    var numTeams = teamsPageComponent[1].length;

    var canAdd = teamsPageComponent[0];

    expect(numTeams).toEqual(2);
    expect(canAdd.type.displayName).toBe('AddAsset');
  });

  it('should not contain AddAsset if user is not logged in', function() {
    var loggedInUser = {
      get: function( param ) {
        return {
          team: {
            add: false,
            remove: true
          }
        };
      }
    };

    var teamList = TestUtils.renderIntoDocument(
      <TeamsPage teams={teams} loggedInUser={loggedInUser} />
    );
    var teamsPageComponent = TestUtils.scryRenderedDOMComponentsWithClass(teamList, 'teams')[0].props.children;

    var canAdd = teamsPageComponent[0];
    expect(canAdd).toBe('');
  });

});
