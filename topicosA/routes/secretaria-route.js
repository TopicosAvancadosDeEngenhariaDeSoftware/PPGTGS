var express = require('express');
var router = express.Router();
var controllerSecretaria = require('../controller/secretaria-controller');

/* GET home page. */

router.get('/aprovacoes', controllerSecretaria.carregarTelaAprovacoes);
router.get('/', controllerSecretaria.carregarTelaHome);

module.exports = router;

