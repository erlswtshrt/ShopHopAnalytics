var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ref = new Firebase("https://shophopusers.firebaseio.com");

var LoginContainer = React.createClass({displayName: "LoginContainer",
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
      React.createElement("div", {className: "flex-col c full-bg h-full"}, 
        React.createElement("div", {className: "textWhite text2"}, "analytics"), 
        React.createElement("form", {className: "flex-col mt1"}, 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "email", placeholder: "Email", ref: "email"}), 
          React.createElement("input", {className: "textInputLarge", type: "password", name: "password", placeholder: "Password", ref: "password"})
        ), 
        React.createElement("div", {className: "buttonLarge bgDarkBlue textWhite", onClick: this.login}, "Log in"), 
        React.createElement("div", {className: "buttonLarge bgPurple textWhite", onClick: this.updateAppState}, "Register")
      )
    );
  }
});

module.exports = LoginContainer;