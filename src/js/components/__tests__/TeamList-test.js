jest.dontMock('../TeamList.jsx');


describe('Remove TeamList component', function() {
  var React, TeamList, TestUtils, TeamListComponent;
  beforeEach(function() {
    React = require('react/addons');
    TeamList = require('../TeamList.jsx');
    TestUtils = React.addons.TestUtils;
    var teams = [
        {
          get: function( name ) {
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
      ;
    TeamListComponent = TestUtils.renderIntoDocument(
      <TeamList teams={teams} canRemove={true} />
    );
  });

  it('should should render', function() {
    var result = TeamListComponent.getDOMNode();
    expect(result.className).toBe('teams-list')
  });
});
