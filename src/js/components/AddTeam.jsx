var React = require('react');
var ReactTypeahead = require('../../../node_modules/react-typeahead/src/react-typeahead');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var _ = require('lodash');

var AddAsset = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false,
      teamName: ''
    }
  },
  handleOpen: function() {
    this.setState({isOpen: true});
  },
  handleClose: function() {
    this.setState({isOpen: false});
  },
  handleAdd: function(e) {
    if (this.state.teamName.length < 3) {
      return;
    }
    TeamActions.create({
      teamName: this.state.teamName
    });
    this.setState({isOpen: false});
  },
  onKeyDown: function(e) {
    if (e.keyCode === 13) {
      this.handleAdd();
    }
  },
  onChange: function(e) {
    this.state.teamName = e.target.value;
    this.setState(this.state);
  },
  render: function() {
    if (this.state.isOpen) {
      return (
        <div>
          <input ref='input' onChange={this.onChange} onKeyDown={this.onKeyDown} />
          <Icon type='plus' disabled={this.state.teamName.length < 3} onClick={this.handleAdd} />
          <Icon type='delete' onClick={this.handleClose} />
        </div>
      );
    } else {
      return (
        <div className ="add-team">
          <Icon type='plus' onClick={this.handleOpen} />
        </div>
      )
    }
  }
});

module.exports = AddAsset;
