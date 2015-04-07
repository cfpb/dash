var React = require('react');
var actions = require('../actions/NavigationActions');

var Home = React.createClass({
  componentDidMount: function() {

  },
  _handleClick: function(e) {
    e.preventDefault();
    actions.navigate(e.target.getAttribute('href'));
  },
  render: function() {
    return (
      <ul>
        <li><a href="./teams" onClick={this._handleClick}>Check out your teams!</a></li>
        <li><a href="./users" onClick={this._handleClick}>Check out all dem users!</a></li>
        <li><a href="./resources" onClick={this._handleClick}>Resources!</a></li>
      </ul>
    );
  }
});

module.exports = Home;
