var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var cookieSession = require('cookie-session');
require('dotenv').config();
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge:  60 * 1000
}));


app.use((req, res, next) => {
  console.log(req.session, 'z middleware')
  if (!(req.session && req.session.userToken)) {
    return next();
  }

  User.findById(req.session.userID, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next();
    }

    user.password = undefined;
    req.user = user;
    res.locals.user = user;

    next();
    });
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
