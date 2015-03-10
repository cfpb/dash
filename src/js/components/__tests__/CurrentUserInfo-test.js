jest.dontMock('../CurrentUserInfo.jsx')
  .dontMock('../../stores/UserStore');

describe('Current user', function() {
  it('should render user name and role', function() {
    var React = require('react/addons');
    var CurrentUserInfo = require('../CurrentUserInfo.jsx');
    var TestUtils = React.addons.TestUtils;
    var UserStore = require('../../stores/UserStore');
    var $ = require('jquery');
    var user = {
      data: {
        username: 'boo'
      },
      roles: ['admin']
    };

    spyOn(UserStore, 'getCurrentUser').andCallFake(function(req) {
      var d = $.Deferred();
      d.resolve(user);
      return d.promise();
    });
    var currentUserInfo = TestUtils.renderIntoDocument(
      <CurrentUserInfo />
    );
    var userNode = currentUserInfo.getDOMNode();
    expect(userNode.className).toEqual('current-user');
    expect(userNode.childNodes[0].childNodes[0].textContent).toEqual('boo');
    expect(userNode.childNodes[0].childNodes[1].textContent).toEqual('admin');
  });

  it('should render login button whe user is not authd', function() {
    var React = require('react/addons');
    var CurrentUserInfo = require('../CurrentUserInfo.jsx');
    var TestUtils = React.addons.TestUtils;
    var UserStore = require('../../stores/UserStore');
    var $ = require('jquery');

    spyOn(UserStore, 'getCurrentUser').andCallFake(function(req) {
      var d = $.Deferred();
      d.reject();
      return d.promise();
    });
    var currentUserInfo = TestUtils.renderIntoDocument(
      <CurrentUserInfo />
    );
    var userNode = currentUserInfo.getDOMNode();
    expect(userNode.childNodes[0].childNodes[0].textContent).toEqual('Log into DevDash');
  });
});
