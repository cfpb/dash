jest.dontMock('../CurrentUserInfo.jsx');
jest.dontMock('../Button.jsx');

var Button = require('../Button.jsx');

describe('Current user', function() {
  it('should render username and roles if user is logged in', function() {
    var React = require('react/addons');
    var CurrentUserInfo = require('../CurrentUserInfo.jsx');
    var TestUtils = React.addons.TestUtils;
    var loggedInUser = {
      isLoggedIn: function() {
        return true;
      },
      'get': function( param ) {
        return {
          roles: ['admin', 'member'],
          data: {username: 'Mo'}
        }[param]
      }
    };
    var currentUserInfo = TestUtils.renderIntoDocument(
      <CurrentUserInfo loggedInUser={loggedInUser} />
    );
    var userNode = currentUserInfo.getDOMNode();
    expect(userNode.className).toEqual('current-user');
    expect(userNode.childNodes[0].childNodes[0].childNodes[0].textContent).toEqual('Mo');
    expect(userNode.childNodes[0].childNodes[0].childNodes[1].textContent).toEqual('admin, member');
  });

  it('should render login button whe user is not authd', function() {
    var React = require('react/addons');
    var CurrentUserInfo = require('../CurrentUserInfo.jsx');
    var TestUtils = React.addons.TestUtils;
    var loggedInUser = {
      isLoggedIn: function() {
        return false;
      }
    };
    var currentUserInfo = TestUtils.renderIntoDocument(
      <CurrentUserInfo loggedInUser={loggedInUser} />
    );
    var userNode = currentUserInfo.getDOMNode();
    expect(userNode.textContent).toEqual('Log into DevDash');
  });
});
