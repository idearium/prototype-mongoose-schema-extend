// Load module dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    muexpress = require('./lib/mu-express'),
    http = require('http'),
    path = require('path'),
    routes = require('./lib/load')('./routes/'),
    mongoose = require('mongoose'),
    middleware = require('./lib/load')('./middleware/'),
    app = express();

require('./models/user');
// Connect to mongodb
mongoose.connect('mongodb://localhost/prototype-mongoose-schema-extend');

// Setup express
app.set('views', __dirname + '/views');     // setup the views
app.engine('html', muexpress.__express);    // register the mu-templating engine
app.set('view engine', 'html');             // register template engine as HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Setup routes
app.use(app.router);

app.get('/', routes.home);
app.get('/user/create', routes.usercreate);
app.post('/user/create', middleware.usercreate, routes.usersaved);
app.get('/user/:username', routes.user);

var server = app.listen(3002, function() {
    if (process.env.NODE_ENV !== 'production') console.log('Listening on port %s', server.address().port);
});
