// might the workshop want to call this one server.js? (Express > API routes)

const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')));

// Any routes or other various middlewares should go here!
const morgan = require('morgan');
app.use(morgan('dev'));


app.use('/api', require('./routes')); // matches all requests to /api

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)

// Note that if you want to give more informational messages about valid frontend routes vs routes that are invalid change up your (below)
// our server should send its index.html for any requests that don't match one of our API routes.
app.get('*', function(req, res, next) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

// needs to be very end - can we add whale jpg here later? downloaded into directory already
app.use(function(err, req, res, next) {
   console.error(err);
   console.error(err.stack);
   res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app