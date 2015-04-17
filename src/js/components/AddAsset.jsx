var React = require('react');
var ReactTypeahead = require('../../../node_modules/react-typeahead/src/react-typeahead');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var _ = require('lodash');

var AddAsset = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false,
      assetName: ''
    }
  },
  handleOpen: function() {
    this.setState({isOpen: true});
  },
  handleClose: function() {
    this.setState({isOpen: false});
  },
  handleAdd: function(e) {
    if (this.state.assetName.length < 3) {
      return;
    }
    TeamActions.addAsset({
      id: this.props.teamName,
      resourceName: this.props.resourceName,
      assetData: {new: this.state.assetName}
    });
    this.setState({isOpen: false});
  },
  onChange: function(e) {
    this.state.assetName = e.target.value;
    this.setState(this.state);
  },
  render: function() {
    if (this.state.isOpen) {
      return (
        <div>
          <input ref='input' onChange={this.onChange} />
          <Icon type='plus' disabled={this.state.assetName.length < 3} onClick={this.handleAdd} />
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

module.exports = AddAsset;
