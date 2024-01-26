var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var mongoose = require('./db/connection');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var portalRouter = require('./routes/portal');
var session = require('express-session');
var MongoStore = require('connect-mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('client/build'));
app.use(express.static('build'));
app.use(session({
  secret: process.env.secretKey,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI })
}));

app.use(function(req, res, next) {
  const allowedOrigins = ['http://localhost:3000','http://localhost:3001', 'https://portal.contractorgarage.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  }
  else {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  }
});

function auth(req, res, next) {
  if (!req.session.user) {
    const err = new Error('Not authorized!');
    err.status = 401;
    return next(err);
  }
  next();  
}

app.use('/api', apiRouter);
app.use('/portal', auth, portalRouter);
app.use('/', indexRouter);

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

module.exports = app;
