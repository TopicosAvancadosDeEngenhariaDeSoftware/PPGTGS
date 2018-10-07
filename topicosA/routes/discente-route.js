var express = require('express');
var router = express.Router();
var controllerDiscente = require('../controller/discente-controller');

/* GET home page. */
router.get('/registro', controllerDiscente.cadastrarDiscente);
router.post('/teste', async (req, res, next) =>{
    //
    console.log(req);
    res.json(req.body);
});



module.exports = router;

