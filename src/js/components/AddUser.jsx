var React = require('react');
var ReactTypeahead = require('../../../node_modules/react-typeahead/src/react-typeahead');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var _ = require('lodash');

var AddUser = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false
    }
  },
  handleOpen: function() {
    console.log('open!');
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
      teamName: this.props.teamName,
      roleName: this.props.role,
      userId: this.state.selectedUser.id,
    });

  },
  onKeyDown: function(e) {
    this.setState(_.pick(this.state, 'isOpen'));
  },
  handleOptionSelected: function(selectedUsername) {
    this.state.selectedUser = _.find(this.props.users, function(user) {
      return user.get('data').username == selectedUsername
    });
    this.setState(this.state);
  },
  render: function() {
    var users = this.props.users.map(function(user) {
      return user.get('data').username;
    });
    if (this.state.isOpen) {
      return (
        <div>
          <ReactTypeahead.Typeahead defaultValue='' options={users} onKeyDown={this.onKeyDown} onOptionSelected={this.handleOptionSelected}/>
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

module.exports = AddUser;
