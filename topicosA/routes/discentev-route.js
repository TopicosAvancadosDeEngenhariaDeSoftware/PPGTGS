var express = require('express');
var router = express.Router();
var controllerDiscente = require('../controller/discente-controller');

/* GET home page. */
router.get('/', controllerDiscente.consultaDiscenteFiltro);


module.exports = router;

