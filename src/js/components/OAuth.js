var React = require('react');
var Const = require('../util/const');

require('../../scss/Login.scss');

/*
 *  Oauth Redirect View Component
 */
class OAuth extends React.Component {

    constructor() {
        super();
        var token = window.location.hash.split('=')[1]
        window.opener._instaLogin(token);
    }

    /*
     *  Return JSX representation of component view
     */
    render () {
        return (
            <div className="Login">
                <div className="background"></div>
                <div className="header">Thanks for logging in!</div>
            </div>
        );
    }

}

module.exports = OAuth;