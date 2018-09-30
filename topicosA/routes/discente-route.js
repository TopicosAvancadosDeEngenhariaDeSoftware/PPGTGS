'use strict'

const discente_controller = require('../controller/discente-controller');

// CRUD = Create, Read, Update, Delete
// Create = POST method
// READ   = GET method
// UPDATE = PUT method
// DELETE = DELETE method

const router = require('express').Router();
console.log('oi');
router.post('/discentes',discente_controller.cadastrarDiscente);
/*router.put('/aviarios/:id_aviario/sondas/:id_sonda', sonda_controller.editarSonda);
router.get('/aviarios/:id_aviario/posicoes_sonda/:posicao', sonda_controller.recuperarSondaPosicao);
router.get('/aviarios/:id_aviario/sondas/:id_sonda', sonda_controller.recuperarSonda);
router.get('/aviarios/:id_aviario/sondas', sonda_controller.recuperarSondasAviario);

router.delete('/aviarios/:id_aviario/sondas/:id_sonda', sonda_controller.excluirSonda);
router.put('/aviarios/:id_aviario/sondas/:id_sonda/situacao', sonda_controller.alterarStatusSonda);
*/



//router.get('/aviarios/:id_aviario/sondas', aviario_controller.recuperarSondas);

module.exports = router;