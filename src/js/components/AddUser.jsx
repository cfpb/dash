var React = require('react');
var ReactTypeahead = require('../../../node_modules/react-typeahead/src/react-typeahead');
var Icon = require('./Icon.jsx');

var Icon = React.createClass({
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
  handleAdd: function() {
    console.log('ADD USER!!');
  },
  render: function() {
    var users = this.props.users.map(function(user) {return user.get('data').username;});
    if (this.state.isOpen) {
      return (
        <div>
          <ReactTypeahead.Tokenizer options={users} />
          <Icon type='plus' onClick={this.handleAdd} />
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

module.exports = Icon;
