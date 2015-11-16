var React = require('react/addons');
var LoginContainer = require('./LoginContainer');
var RegisterContainer = require('./RegisterContainer');
var DashboardContainer = require('./DashboardContainer');
var HomeContainer = require('./HomeContainer');
var AnalyticsContainer = require('./AnalyticsContainer');
var NewProductContainer = require('./NewProductContainer');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var IndexRoute = require('react-router').IndexRoute
var History = require('history');
var createBrowserHistory = require('history/lib/createBrowserHistory');


var ref = new Firebase('https://shophopusers.firebaseio.com/');

var MasterContainer = React.createClass({
	 mixins: [ History ],
	updateAppState: function(__state) {
		this.setState({ appState: __state });
	},
	getInitialState: function() {
		return {	user: null,
					appState: 'home'	};
	},
	setUser: function(__uid) {
		var self = this;

	    var usersRef = ref.child("webusers");
	    var userRef = usersRef.child(__uid);

	    userRef.on("value", function(snapshot) {
	      	self.setState({ user: snapshot.val() });
	      	self.updateAppState('home');
	    });
	},
	render: function() {
		return 	<div>{this.props.children}</div>;
	}
});

var requireAuth = function() {
	authData = ref.getAuth();
  if(authData === null) this.history.pushState(null, '/login');
}

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={MasterContainer}>
    	<IndexRoute component={LoginContainer} />
    	<Route path="login" component={LoginContainer}/>
      <Route path="register" component={RegisterContainer} onEnter={requireAuth} />
      <Route path="home" component={HomeContainer} onEnter={requireAuth} />
      <Route path="newproduct" component={NewProductContainer} onEnter={requireAuth} />
      <Route path="analytics" component={AnalyticsContainer} onEnter={requireAuth} />
    </Route>
  </Router>
), document.body)