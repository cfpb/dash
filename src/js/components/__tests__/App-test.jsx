jest.dontMock('../App.jsx');

describe('App', function() {
    var React, App, AppComponent, TestUtils, renderer;
    beforeEach(function() {

      React = require('react/addons');
      App = require('../App.jsx');
      TestUtils = React.addons.TestUtils;
     // renderer = TestUtils.createRenderer()
      AppComponent = TestUtils.renderIntoDocument(
        <App/>
      );
    // renderer.render(App);
    });
    xit('should render the component', function() {
      //var result = renderer.getRenderOutput();
      var result = AppComponent.getDOMNode();
      expect(result.className).toBe('app')
    });
  }
);
