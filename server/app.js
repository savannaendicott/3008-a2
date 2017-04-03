var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var index = require('./routes/index');
var grid = require('./routes/grid');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// the secret key used to generate each user's seed.
app.set('seed salt', '27BC761B78E3401780F20D3C0B4067E5');

var glypharray = [];
app.set('glyph count', 234);

for (var i = 0; i < app.get('glyph count'); i++) {
  glypharray[i] = i;
}

app.set('glyph array', glypharray);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = new sqlite3.Database('db.sqlite');

db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, website TEXT, plaintext_password TEXT, hash TEXT, salt TEXT);")

var useDb = function(req, res, next) {
  req.db = db;
  next();
};
app.use(useDb);
app.use('/', index);
app.use('/grid', grid);
app.use('/login', login);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
