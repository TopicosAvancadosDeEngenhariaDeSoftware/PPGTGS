var express = require('express');
var router = express.Router();
var controllerDiscente = require('../controller/discente-controller');

/* GET home page. */
router.get('/registro', controllerDiscente.cadastrarDiscente);



module.exports = router;

