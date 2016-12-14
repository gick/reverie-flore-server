// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var sparql = require('./src/sparql/sparql.js')

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());


// basic config
var PORT = 8000;
// routes ======================================================================
require('./src/route/documentRoutes.js')(app, sparql); // load routes to services
require('./src/route/staticRoutes.js')(app); // load satic routes 
// launch ======================================================================
//server = https.createServer(https_options, app).listen(PORT);
app.listen(8080);
