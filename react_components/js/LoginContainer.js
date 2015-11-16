var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var History = require('react-router').History;

var ref = new Firebase("https://shophopusers.firebaseio.com");

var LoginContainer = React.createClass({displayName: "LoginContainer",
  mixins: [ History ],
  getInitialState: function() {
    return {loading: false};
  },
  login: function() {
    this.setState({loading: true});
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim()
    var self = this;

    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) console.log("Login Failed!", error);
      else self.history.pushState(null, '/home');
    });

  },
  render: function() {
      return this.state.loading ? React.createElement("div", {className: "flex-col full-bg c"}, 
      React.createElement("div", {className: "spinner"}, 
        React.createElement("div", {className: "rect1"}), 
        React.createElement("div", {className: "rect2"}), 
        React.createElement("div", {className: "rect3"}), 
        React.createElement("div", {className: "rect4"}), 
        React.createElement("div", {className: "rect5"})
      )
    ) :
      React.createElement("div", {className: "flex-col c full-bg h-full"}, 
        React.createElement("div", {className: "flex-row"}, 
          React.createElement("img", {src: "www/assets/logo.svg", height: "30", width: "30"}), 
          React.createElement("div", {className: "textWhite text1-8 ml0-5"}, "analytics")
        ), 
        React.createElement("form", {className: "flex-col mt2 c"}, 
          React.createElement("div", null, React.createElement("input", {className: "textInputLarge c", type: "text", name: "email", placeholder: "Email", ref: "email"})), 
          React.createElement("input", {className: "textInputLarge c", type: "password", name: "password", placeholder: "Password", ref: "password"})
        ), 
        React.createElement("div", {className: "buttonLarge bgGreen textWhite", onClick: this.login}, "Log in"), 
        React.createElement(Link, {to: "/register"}, React.createElement("div", {className: "buttonLarge bgRed textWhite"}, "Register"))
      )
  }
});

module.exports = LoginContainer;