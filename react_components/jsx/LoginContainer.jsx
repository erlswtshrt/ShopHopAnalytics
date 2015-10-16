var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ref = new Firebase("https://shophopusers.firebaseio.com");

var LoginContainer = React.createClass({
  updateAppState: function() {
    this.props.updateAppState('register');
  },
  login: function() {
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim()
    var self = this;

    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else self.props.setUser(authData.uid);
    });
  },
  render: function() {
    return (
      <div className="flex-col c full-bg h-full">
        <div className="textWhite text2">analytics</div>
        <form className="flex-col mt1">
          <input className="textInputLarge" type="text" name="email" placeholder="Email" ref="email" />
          <input className="textInputLarge" type="password" name="password" placeholder="Password" ref="password" />
        </form>
        <div className="buttonLarge bgDarkBlue textWhite" onClick={this.login}>Log in</div>
        <div className="buttonLarge bgPurple textWhite" onClick={this.updateAppState}>Register</div>
      </div>
    );
  }
});

module.exports = LoginContainer;