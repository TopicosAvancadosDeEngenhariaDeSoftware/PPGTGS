var express = require('express');
var router = express.Router();
var controllerEstados = require('../../controller/json/estado-controller');

/* GET home page. */
router.get('/paises/:id_pais/estados', controllerEstados.recuperarEstadosPorPais);

module.exports = router;
