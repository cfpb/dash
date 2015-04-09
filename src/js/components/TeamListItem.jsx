var React = require('react');
var Button = require('./Button.jsx');
var Icon = require('./Icon.jsx');
var Router = require('react-router');
var Link = Router.Link;

var TeamListItem = React.createClass({

  render: function() {

    return (
      <li>
        <Link to="team" params={{teamName: this.props.team.get('name')}}>{this.props.team.get('name')}</Link>
      </li>
    )
  }

});

module.exports = TeamListItem;
