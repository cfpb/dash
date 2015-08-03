var React = require('react');
var _ = require('lodash');

var Button = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ])
  },
  getDefaultProps: function() {
    return {
      label: 'Click here!',
      type: []
    };
  },
  render: function() {

    var buttonTypes = (this.props.type instanceof Array) ? this.props.type : [this.props.type];
    var buttonProps = _.omit(this.props, 'label', 'type', 'className');
    var buttonClasses = this.props.className ? this.props.className + ' ' : '';
    buttonClasses = buttonClasses + 'btn' + buttonTypes.map(function(t) {
        return ' btn__' + t
      }).join('');

    if (this.props.href) {
      return (
        <a className={buttonClasses} {...buttonProps}>{this.props.label}</a>);
    } else {
      return (
        <button className={buttonClasses} {...buttonProps}>{this.props.label}</button>
      );
    }
  }
});

module.exports = Button;
