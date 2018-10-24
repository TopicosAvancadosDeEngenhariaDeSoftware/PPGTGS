'use strict'

const discente_controller = require('../../controller/json/discente-controller');

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

//indicadores
router.get('/discentes/instituicoes/total', discente_controller.RecuperarDiscenteInstituicao);
router.get('/discentes/cargos/total', discente_controller.RecuperarDiscenteCargoInstituicao);
router.get('/discentes/paises/total', discente_controller.RecuperarNacionalidadeDiscente);
router.get('/discentes/tipos_instituicoes_discente/total', discente_controller.RecuperarTipoInstituicaoDiscente);
router.get('/discentes/titulos/total', discente_controller.RecuperarTituloDiscente);
//router.get('/discentes', discente_controller.recuperarDiscentes);



module.exports = router;