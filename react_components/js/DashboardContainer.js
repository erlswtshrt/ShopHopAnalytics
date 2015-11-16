var React = require('react/addons');
var NewProductContainer = require('./NewProductContainer');
var HomeContainer = require('./HomeContainer');
var AnalyticsContainer = require('./AnalyticsContainer');

var DashboardContainer = React.createClass({displayName: "DashboardContainer",
	updateDashState: function(__state) {
		this.setState({ dashState: __state });
	},
	getInitialState: function() {
		return {	user: null,
					dashState: 'home'	};
	},
	componentDidMount: function() {
		if(this.props.user === null) this.props.updateAppState('login');
	},
	render: function() {
		switch(this.state.dashState) {
			case 'home':
				return React.createElement(HomeContainer, {updateState: this.updateDashState, user: this.props.user, uid: this.props.uid})
				break;
		    case 'newProduct':
		        return React.createElement(NewProductContainer, {user: this.props.user, uid: this.props.uid})
		        break;
		    case 'analytics':
		        return React.createElement(AnalyticsContainer, {updateState: this.updateDashState, user: this.props.user, uid: this.props.uid})
		        break;
		    default:
		        return React.createElement("div", null, "rendering error")
		}
	}
});

module.exports = DashboardContainer;