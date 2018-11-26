var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const validar = require('./utils/validar');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectionMiddleware = require('./middleware/connection-middleware');

const pool = require('./bd/pool-factory');
var cookieSession = require('cookie-session');
var configuracao = require('./config/config');
var autenticacaoJWT = require('./auth/auth-jwt');

var index_Router = require('./routes/index');
var login_Route = require('./routes/login-route');
var utils_Route = require('./routes/utils-route');
var discente_Route = require('./routes/discente-route');
var discenteV_Route = require('./routes/discentev-route');
var secretaria_Route = require('./routes/secretaria-route');
var coordenador_Route = require('./routes/coordenador-route');

var tipo_discente_json_Route = require('./routes/json/tipo-discente-route');
var discente_json_Route = require('./routes/json/discente-route');
var secretaria_json_Route = require('./routes/json/secretaria-route');
var cidade_json_Route = require('./routes/json/cidade-route');
var estado_json_Route = require('./routes/json/estado-route');

var app = express();


app.use(bodyParser.json()); // middleware
app.use(expressValidator({
  customValidators: {
    isValidListaOcupacoes : validar.isValidoListaOcupacoes
  }
}));
app.use(connectionMiddleware(pool));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.set('trust proxy', 1);




app.use(cookieSession({
  name: 'session',
  keys: [configuracao.config.chave],
  maxAge: 12 * 60 * 60 * 1000
}))



app.use('/',login_Route);

app.use(autenticacaoJWT.verificarSessao);
app.use('/',utils_Route);

app.use('/discente/',discenteV_Route);
app.use('/discentes/',discente_Route);
app.use('/secretaria/',secretaria_Route);
app.use('/coordenador/', coordenador_Route);

//Lugar de teste dos post get etc /json/
app.use('/json/',discente_json_Route);
app.use('/json/',secretaria_json_Route);
app.use('/json/',tipo_discente_json_Route);
app.use('/json/',cidade_json_Route);
app.use('/json/',estado_json_Route);




//A partir daqui as rotas precisao de autenticacao.


app.use('/', index_Router);


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
