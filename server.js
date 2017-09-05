	// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var io = require('socket.io');
var http = require('http');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Grid = require('gridfs-stream');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var flash = require('connect-flash');
var configDB = require('./src/config/database.js');
Grid.mongo = mongoose.mongo;


var sparql = require('./src/sparql/sparql.js')
mongoose.connect(configDB[0].url); // connect to our database
require('./src/config/passport.js')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
var gfs = new Grid(mongoose.connection.db);

// basic config
var PORT = 8000;
// routes ======================================================================
require('./src/route/routes.js')(app, passport); // load routes to services

require('./src/route/documentRoutes.js')(app, sparql, gfs); // load routes to services
require('./src/route/staticRoutes.js')(app); // load satic routes 
// launch ======================================================================
//server = https.createServer(https_options, app).listen(PORT);
app.listen(80);
