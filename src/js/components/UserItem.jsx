var React = require('react');

var UserItem = React.createClass({

  render: function() {
    return (
      <li className="user-item">{this.props.name}</li>
    )
  }

});

module.exports = UserItem;