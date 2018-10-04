var express = require('express');
var router = express.Router();
var controllerCidades = require('../../controller/json/cidade-controller');

/* GET home page. */
router.get('/estados/:id_estado/cidades', controllerCidades.recuperarCidadesPorEstado);

module.exports = router;
