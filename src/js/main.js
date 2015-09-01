var React = require('react');
var Router = require('react-router');
var App = require('./components/App');
var HomeFeed = require('./components/HomeFeed');
var Login = require('./components/Login');
var OAuth = require('./components/OAuth');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/*
 *  Client Side Route Handler
 */
var routes = (
    <Route handler={App}>
        <DefaultRoute name="login" handler={Login} />
        <Route name="feed" handler={HomeFeed} />
        <Route name="oauth" handler={OAuth} />
    </Route>
);

var router = Router.create({
    mixins: [Router.Navigation],
    routes: routes,
    location: Router.HistoryLocation
});

router.run((Root) => {
    React.render(<Root/>, document.getElementById('content'));
});

module.exports = router;