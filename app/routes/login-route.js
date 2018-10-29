var express = require('express');
var router = express.Router();
var autenticacao_controller = require('../controller/autenticacao-controller');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/login');
});

router.post('/auth', autenticacao_controller.autenticarUsuario);


module.exports = router;
