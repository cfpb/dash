var React = require('react');
var Button = require('./Button.jsx');
var UserPage = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState:function(){
      
    },
    handleClick: function(e) {
       e.preventDefault();
      e.stopPropagation();
      console.log("key added");
    },
    render: function() {
      var userId = this.context.router.getCurrentParams().userId;
      var user = this.props.users.get(userId);
      var username = user.get('data').username;
      return (
        <div className="userPage">
          <h1>{username}</h1>
          <h2>Assets</h2>
          <textarea rows="4" columns="3"></textarea>
          <Button label='Add public key' onClick={this.handleClick}/>
        </div>
      );
    }
  })
  ;

module.exports = UserPage;