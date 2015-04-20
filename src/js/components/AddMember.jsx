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
    if (e.keyCode === 13) {
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
        <div>
          <ReactTypeahead.Typeahead ref='typeahead' options={users} onChange={this.onChange} onKeyDown={this.onKeyDown} onOptionSelected={this.onChange}/>
          <Icon type='plus' disabled={!this.state.selectedUser} onClick={this.handleAdd} />
          <Icon type='delete' onClick={this.handleClose} />
        </div>
      );
    } else {
      return (
        <div>
          <Icon type='plus' onClick={this.handleOpen} />
        </div>
      )
    }
  }
});

module.exports = AddMember;
