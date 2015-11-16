var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ActionsBar = require('./HomeActionsBar');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var History = require('react-router').History;

var ref = new Firebase("https://shophopusers.firebaseio.com/");
var authData = null;

var uid = null;

var HomeContainer = React.createClass({
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  getInitialState: function() {
    return { productId: null }
  },
  render: function() {
    return (
      <div>
        <div className="flex-col homeHeader-bg">
          <div className="flex-row  mt1 ml3">
            <img src="www/assets/logo.svg" height="24" width="24" />
            <div className="textWhite text1-5 ml0-5">analytics</div>
          </div>
          <div className="h15" />
          <div className="flex-row c mt2">
            <Link to="/newproduct">
            <div className="c bRightWhite p">
              <div className="opacityTile pr5 pl5">
                <img src="www/assets/user.svg" height="22" width="22" />
                <div className="textWhite text0-9 mt0-5">profile</div>
              </div>
            </div>
            </Link>
            <Link to="/analytics">
              <div className="c bRightWhite p">
                <div className="opacityTile pr5 pl5">
                  <img src="www/assets/analytics.svg" height="22" width="22" />
                  <div className="textWhite text0-9 mt0-5">analytics</div>
                </div>
              </div>
            </Link>
            <Link to="/profile">
              <div className="c p">
                <div className="opacityTile pr5 pl5">
                  <img src="www/assets/add.svg" height="22" width="22" />
                  <div className="textWhite text0-9 mt0-5">new product</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomeContainer;