
/** @jsx React.DOM */

// CheckboxWithLabel.js
if (typeof module !== 'undefined' && module.exports) {
  var React = require('react/addons');
}
var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CheckboxWithLabel;
}
