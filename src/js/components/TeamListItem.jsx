var React = require('react');

var TeamListItem = React.createClass({

  render: function() {
    var teamName = this.props.team.get('name');
    return (
      <li className="list-item teams-list-item">
        <a href={'#/teams/' + teamName}>{teamName}</a>
      </li>
    )
  }
});

module.exports = TeamListItem;
