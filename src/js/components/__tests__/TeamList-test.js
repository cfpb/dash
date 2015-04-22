jest.dontMock('../TeamList.jsx')
    .dontMock('../../stores/LoggedInUserStore.js')
    .dontMock('jquery');

describe('List of teams', function() {
  it('should contain some teams', function() {
    var React = require('react/addons');
    var TeamList = require('../TeamList.jsx');
    var TestUtils = React.addons.TestUtils;

    /* eslint-disable */
    var teams = [
        {
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
      ];
    
    var users = [{name: 'c7a9d8c1c0516c0910f7b2013e0019e7', data: {username: 'agarwalan'}}];
    /* eslint-enable */

    var teamList = TestUtils.renderIntoDocument(
      <TeamList teams={teams} users={users} />
    );

    var numTeams = TestUtils.scryRenderedDOMComponentsWithClass(teamList, 'teams_item').length;
    expect(numTeams).toEqual(2);

  });
});
