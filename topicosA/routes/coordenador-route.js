var express = require('express');
var router = express.Router();
var coordenador_controler = require('../controller/coordenador-controller');

/* GET home page. */
router.get('/indicadores', coordenador_controler.carregarTelaIndicadores);


module.exports = router;
