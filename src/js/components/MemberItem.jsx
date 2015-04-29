var React = require('react');
var TeamActions = require('../actions/TeamActions');
var Icon = require('./Icon.jsx');
var RemoveMember = require('./RemoveMember.jsx');

var Router = require('react-router');
var Link = Router.Link;

var MemberItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var name = this.props.user.get('data').username;
    deleteIcon = (this.props.canRemove) ? <RemoveMember teamName={this.props.teamName} roleName={this.props.roleName} userId={this.props.user.id} /> : '';
    return (
      <li className='user-item'>
        {deleteIcon}
        <Link to="User" params={{userId: this.props.user.id}}>
          <span className='user-name'>{name}</span>
        </Link>
      </li>
    )
  }
});

module.exports = MemberItem;