// strict execution of the application 
'use strict';

var createError = require('http-errors');
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//Enables retrieving data from the front-end
var logger = require('morgan');//LOGS DATA INTO THE CONSOLE ABOUT THE REQUESTS

//get connection to mongodb
require('./app_server/models/db')

/* Get the Routes   */
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

//initialize the app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// server options
const options = {
  host : '127.0.0.1',
  port : 3000
}

// allocate a server port or use a default options.port for the server
app.set('port', process.env.PORT || options.port);

// Allow cross-platform sharing
app.set('/', (req, res) => {
  app.set({
    'Allow-Access-Control-Origin' : '*'
  });
  return res.redirect('home');
});

// defining middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));//access to the public folder

//definition of routes as the main entry of the application
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// create application server
const server = http.createServer(app);
  server.listen(options, () => {
    console.log(`Server listening at ${options.host} on port: ${options.port}`);
  });