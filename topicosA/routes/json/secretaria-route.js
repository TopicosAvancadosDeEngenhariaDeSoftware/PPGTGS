var express = require('express');
var router = express.Router();

const secretaria_controller = require('../../controller/json/secretaria-controller');

// READ   = GET method
// UPDATE = PUT method

router.put('/secretaria/aprovar/:id_discente', secretaria_controller.aprovarDiscente);



module.exports = router;