var React = require('react');

var Pinterest = require('../util/pinterest');
var Instagram = require('../util/instagram');

require('../../scss/Login.scss');

/*
 *  Login View Component
 *  @prop  {Function} onAuth    - parent method for redirect
 *  @state {Boolean}  instagram - auth state of Instagram
 *  @state {Boolean}  pinterest - auth state of Pinterest
 */
module.exports = class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            instagram: Instagram.loggedIn(),
            pinterest: Pinterest.loggedIn()
        };
        if (this.state.instagram && this.state.pinterest) {
            this.props.onAuth();
        }
    }

    /*
     *  Set auth state and redirect if necessary
     */
    resetState() {
        var state = {
            instagram: Instagram.loggedIn(),
            pinterest: Pinterest.loggedIn()
        };

        if (state.instagram && state.pinterest) {
            this.props.onAuth();
        } else {
            this.setState(state);
        }
    }

    /*
     *  Login using Pinterest OAuth
     */
    pinLogin() {
        Pinterest.login(session => {
            this.resetState();
        });
    }

    /*
     *  Login using Instagram OAuth
     */
    instaLogin() {
        Instagram.login(() => {
            this.resetState();
        });
    }

    /*
     *  Render helper for clarity in logic
     *  @param {String} type - Internal map to render component
     */
    _render(type) {
        switch (type) {
            case 'InstaButton':
                return !this.state.instagram ? (
                    <button className="button button--instagram" onClick={this.instaLogin.bind(this)}>Log in</button>
                ) : (
                    <div className="success"></div>
                );
            case 'PinButton':
                return !this.state.pinterest ? (
                    <button className="button button--pinterest" onClick={this.pinLogin.bind(this)}>Log in</button>
                ) : (
                    <div className="success"></div>
                );
        }
    }

    /*
     *  Return JSX representation of component view
     */
    render () {
        return (
            <div className="Login">
                <div className="background"></div>
                <div className="header">Log in to both services to Pin your posts!</div>
                <div className="content">
                    <div className="button-wrapper">
                        <div className="image--pinterest"></div>
                        { this._render('PinButton') }
                    </div>
                    <div className="button-wrapper">
                        <div className="image--instagram"></div>
                        { this._render('InstaButton') }
                    </div>
                </div>
            </div>
        );
    }

}
