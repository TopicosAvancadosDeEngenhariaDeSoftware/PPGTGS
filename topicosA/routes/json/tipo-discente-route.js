'use strict'

const tipo_discente_controller = require('../../controller/json/tipo-discente-controller');

// CRUD = Create, Read, Update, Delete
// Create = POST method
// READ   = GET method
// UPDATE = PUT method
// DELETE = DELETE method

const router = require('express').Router();

router.get('/tipos_discente/:id_tipo_discente', tipo_discente_controller.RecuperarTipoDiscente);

module.exports = router;