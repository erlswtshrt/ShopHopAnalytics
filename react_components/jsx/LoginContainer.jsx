var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var History = require('react-router').History;

var ref = new Firebase("https://shophopusers.firebaseio.com");

var LoginContainer = React.createClass({
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
      return this.state.loading ? <div className="flex-col full-bg c">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div> :
      <div className="flex-col c full-bg h-full">
        <div className="flex-row">
          <img src="www/assets/logo.svg" height="30" width="30" />
          <div className="textWhite text1-8 ml0-5">analytics</div>
        </div>
        <form className="flex-col mt2 c">
          <div><input className="textInputLarge c" type="text" name="email" placeholder="Email" ref="email" /></div>
          <input className="textInputLarge c" type="password" name="password" placeholder="Password" ref="password" />
        </form>
        <div className="buttonLarge bgGreen textWhite" onClick={this.login}>Log in</div>
        <Link to="/register"><div className="buttonLarge bgRed textWhite">Register</div></Link>
      </div>
  }
});

module.exports = LoginContainer;