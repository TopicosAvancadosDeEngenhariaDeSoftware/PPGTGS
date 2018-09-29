var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cookieSession = require('cookie-session');
var configuracao = require('./config/config');
var autenticacaoJWT = require('./auth/auth-jwt');

var indexRouter = require('./routes/index');
var loginRoute = require('./routes/login-route');
var utilsRoute = require('./routes/utils-route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) 

app.use(cookieSession({
  name: 'session',
  keys: [configuracao.config.chave],
  maxAge: 12 * 60 * 60 * 1000
}))


app.use('/',loginRoute);
app.use('/',utilsRoute);

//A partir daqui as rotas precisao de autenticacao.
app.use(autenticacaoJWT.verificarSessao);

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