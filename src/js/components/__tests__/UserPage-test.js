jest.dontMock('../UserPage.jsx')
  .dontMock('lodash');

var React, UserPage, TestUtils, UserPageComponent;

describe('UserPage', function() {
  beforeEach(function() {
    React = require('react/addons');
    UserPage = require('../UserPage.jsx');
    TestUtils = React.addons.TestUtils;
    var users = {
        name: 'user',
        data: {
          username: 'curly',
          publicKeys: [{
            name: 'morai', key: 'key'
          }]
        },
        get: function( name ) {
          return this[name];
        }
      },
      loggedInUser = {id: 'goo'}
    UserPageComponent = TestUtils.renderIntoDocument(
      <UserPage users={users} loggedInUser="{loggedInUser}"/>
    );
  })
  ;
  xit('should should render', function() {
    spyOn(UserPageComponent.context.router, 'getCurrentParams').and.returnValue('user')
    var result = UserPageComponent.getDOMNode();
    expect(result.className).toBe('list-item teams-list-item')
  });
})
;
