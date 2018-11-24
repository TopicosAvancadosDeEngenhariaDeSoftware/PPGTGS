var express = require('express');
var router = express.Router();
var controllerSecretaria = require('../controller/secretaria-controller');

/* GET home page. */
router.get('/', controllerSecretaria.recuperarDiscentesPendentes);
router.get('/aceitos', controllerSecretaria.recuperarDiscentesAceitos);
router.get('/aprovar', controllerSecretaria.aprovarDiscente);


router.get('/cleber/aprovacoes', controllerSecretaria.carregarTelaAprovacoes);

module.exports = router;

