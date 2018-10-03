var express = require('express');
var router = express.Router();
var controllerDiscente = require('../controller/discente-controller');

/* GET home page. */
router.get('/registro', controllerDiscente.cadastrarDiscente);

// CRUD = Create, Read, Update, Delete
// Create = POST method
// READ   = GET method
// UPDATE = PUT method
// DELETE = DELETE method

const router = require('express').Router();

router.post('/discentes',discente_controller.cadastrarDiscente);
router.put('/discentes/:id_discente', discente_controller.editarDiscente);
router.delete('/discentes/:id_discente', discente_controller.excluirDiscente);
router.get('/discentes/:id_discente', discente_controller.recuperarDiscenteId);
//router.get('discentes/nome', discente_controller.recuperarDiscenteNome);
//router.get('/discentes', discente_controller.recuperarDiscentes);


module.exports = router;

