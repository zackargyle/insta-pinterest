var express = require('express');
var app = express();

app.set('views', __dirname + '/src');
app.set('view engine', 'jade');

['/', '/feed', '/oauth', '/login'].forEach(function(path) {
    app.get(path, function(req, res) {
        res.render('index', { prod: process.env.NODE_ENV === 'production' });
    });
});
app.use('/static', express.static('./dist'));
app.use('/images', express.static('./images'));

// Start server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});