var React = require('react');
var {RouteHandler} = require('react-router');
var router = require('../main');

require('../../scss/App.scss');

/*
 *  Base App Component for Redirect Handling
 */
module.exports = class App extends React.Component {

    /*
     *  Reroute to login page on logout, or auth-required routes
     */
    onAuthRequired() {
        window.location.href = '/';
    }

    /*
     *  Reroute to HomeFeed on successful authentication
     */
    onAuth() {
        window.location.href = 'feed';
    }

    /*
     *  Return JSX representation of component view
     */
    render () {
        return (
            <div>
                <RouteHandler onAuth={this.onAuth} onAuthRequired={this.onAuthRequired}/>
            </div>
        );
    }

}
