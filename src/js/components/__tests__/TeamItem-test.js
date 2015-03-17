jest.dontMock('../TeamItem.jsx');

describe('Individual team item', function() {
  it('should load a div', function() {
    var React = require('react/addons');
    var TeamItem = require('../TeamItem.jsx');
    var TestUtils = React.addons.TestUtils;

    /* eslint-disable */
    var name = 'foo',
        adminUsers = [
          {
            'name': 'c7a9d8c1c0516c0910f7b2013e010194',
            'data': {'username': 'dezzie'}
          },
          {
            'name': 'c7a9d8c1c0516c0910f7b2013e01500e',
            'data': {'username': 'errosica'}
          }
        ],
        memberUsers = [
          {
            'name': 'c7a9d8c1c0516c0910f7b2013e010194',
            'data': {'username': 'dezzie'}
          },
          {
            'name': 'c7a9d8c1c0516c0910f7b2013e01500e',
            'data': {'username': 'errosica'}
          }
        ],
        assets = [
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
        ];
    /* eslint-enable */

    var teamItem = TestUtils.renderIntoDocument(
      <TeamItem name={name} adminUsers={adminUsers} memberUsers={memberUsers} assets={assets} key={name} />
    );

    expect(teamItem.getDOMNode().className).toEqual('team-item');
  });
});
