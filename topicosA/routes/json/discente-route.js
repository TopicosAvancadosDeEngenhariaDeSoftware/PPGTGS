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
//router.delete('/discentes/:id_discente', discente_controller.excluirDiscenteLogico);
//router.delete('/discentes/excluir/:id_discente', discente_controller.excluirDiscente);
router.get('/discentes/:id_discente', discente_controller.recuperarDiscenteId);

//indicadores
router.get('/discentes/situacoes_discente/:id_situacao/instituicoes/total', discente_controller.RecuperarDiscenteInstituicao);
router.get('/discentes/situacoes_discente/:id_situacao/cargos/total', discente_controller.RecuperarDiscenteCargoInstituicao);
router.get('/discentes/situacoes_discente/:id_situacao/paises/total', discente_controller.RecuperarNacionalidadeDiscente);
router.get('/discentes/situacoes_discente/:id_situacao/tipos_instituicoes_discente/total', discente_controller.RecuperarTipoInstituicaoDiscente);
router.get('/discentes/situacoes_discente/:id_situacao/titulos/total', discente_controller.RecuperarTituloDiscente);
router.get('/discentes/situacoes_discente/:id_situacao/tipos_discente/total',discente_controller.RecuperarTipoDiscente);
router.get('/discentes/situacoes_discente/:id_situacao/tipos_discente/:id_tipo_discente',discente_controller.RecuperarDiscentePorTipoDiscente);
router.get('/discentes/situacoes_discente/:id_situacao',discente_controller.RecuperarDiscentePorSituacao);
router.get('/discentes/situacoes_discente/quantidade/total', discente_controller.RecuperarQuantidadeDiscentePorSituacao);

//router.get('/discentes', discente_controller.recuperarDiscentes);



module.exports = router;