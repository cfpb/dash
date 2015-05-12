jest.dontMock('../App.jsx')
  .dontMock('../../stores/Classes/TeamStore')
  .dontMock('../../stores/Classes/UserStore')
  .dontMock('../../stores/Classes/LoggedInStore')
  .dontMock('../../stores/Classes/Store')
  .dontMock('../../stores/userStore')
  .dontMock('../../stores/loggedInUserStore')
  .dontMock('../../stores/teamStore')
  .dontMock('backbone');

describe('App', function() {
    var React, App, AppComponent, TestUtils, renderer;
    beforeEach(function() {

      React = require('react/addons');
      App = require('../App.jsx');
      TestUtils = React.addons.TestUtils;
      AppComponent = TestUtils.renderIntoDocument(
        <App/>
      );
    });
    it('should render the component', function() {
      var result = AppComponent.getDOMNode();
      expect(result.className).toBe('app');
    });
  }
);
