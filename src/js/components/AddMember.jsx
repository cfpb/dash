var React = require('react');
var ReactTypeahead = require('../../../node_modules/react-typeahead/src/react-typeahead');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var _ = require('lodash');

var AddMember = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false
    }
  },
  handleOpen: function() {
    this.setState({isOpen: true});
  },
  handleClose: function() {
    this.setState({isOpen: false});
  },
  handleAdd: function(e) {
    if (!this.state.selectedUser) {
      return;
    }
    TeamActions.addMember({
      id: this.props.teamName,
      roleName: this.props.roleName,
      userId: this.state.selectedUser.id
    });
    this.setState({isOpen: false});
  },
  getUserByUsername: function(username) {
    return _.find(this.props.users, function(user) {
      return user.get('data').username == username;
    });
  },
  onKeyDown: function(e) {
    if (e.key === 'Enter') {
      this.handleAdd();
    }
  },
  onChange: function(e) {
    var typeAheadvalue = (e.target) ? e.target.value : e;
    this.state.selectedUser = this.getUserByUsername(typeAheadvalue);
    this.setState(this.state)
  },
  render: function() {
    var users = this.props.users.map(function(user) {
      return user.get('data').username;
    });
    if (this.state.isOpen) {
      return (
        <span className="add-item">
          <ReactTypeahead.Typeahead ref='typeahead' placeholder="Username" options={users} onChange={this.onChange} onKeyDown={this.onKeyDown} onOptionSelected={this.onChange}/>
          <Icon ref="plus-icon" type={['plus', 'action']} className="cf-form_input-icon" disabled={!this.state.selectedUser} title="Add member" onClick={this.handleAdd} />
          <Icon ref="minus-icon" type={['delete', 'action']} className="cf-form_input-icon" title="Cancel" onClick={this.handleClose} />
        </span>
      );
    } else {
      return (
        <span className="add-item">
          <Icon ref="plus-icon" type={['plus', 'action']} title="Add member to this team" onClick={this.handleOpen} />
        </span>
      )
    }
  }
});

module.exports = AddMember;
