var express = require('express');
var router = express.Router();
var controllerDiscente = require('../controller/discente-controller');

/* GET home page. */
router.get('/', controllerDiscente.consultaTodosDiscente);

router.get('/filtro', controllerDiscente.consultaDiscenteFiltro);

router.get('/registro', controllerDiscente.cadastrarDiscente);
router.get('/registro_ok', controllerDiscente.cadastrarOk);
router.get('/alterar', controllerDiscente.alterarDiscente);
router.post('/teste', async (req, res, next) =>{
    
    

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('nome', "Verifique seu nome").isLength({ min: 1, max: 40}); 
    req.assert('sobrenome', 'Sobrenome é obrigatório').notEmpty();
    req.assert('sobrenome', "Verifique seu sobrenome").isLength({ min: 1, max: 60}); 
    req.assert('data_nascimento', 'Data de nascimento é obrigatório').notEmpty();
    req.assert('data_nascimento', 'Verifique sua data de dascimento').isISO8601();
    req.assert('id_nacionalidade', 'Nacionalidade é obrigatório').notEmpty();
    req.assert('id_sexo', 'Sexo é obrigatório').notEmpty();
    req.assert('endereco_id_pais', 'País é obrigatório').notEmpty();
    if(req.body.endereco_id_pais != undefined && req.body.endereco_id_pais != null && parseInt(req.body.endereco_id_pais) == 1){
        req.assert('endereco_id_cidade', 'Cidade é obrigatório').notEmpty();
        req.assert('endereco_cep', 'Cep é obrigatório').notEmpty().isLength({ min: 1, max: 20}); 
        req.assert('endereco_bairro', 'Bairro é obrigatório').notEmpty().isLength({ min: 1, max: 40});
        req.assert('endereco_logradouro', 'Logradouro é obrigatório').notEmpty().isLength({ min: 1, max: 60});
        req.assert('endereco_num_residencia', 'Número da residência é obrigatório').notEmpty().isLength({ min: 1, max: 20});
    }
    req.assert('username', 'Username é obrigatório').notEmpty();
    req.assert('id_titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('id_orientador', 'Titulo é obrigatório').notEmpty();
    req.assert('email', 'Verifique seu email').notEmpty().isEmail();
    req.assert('senha', 'Verifique a sua senha').notEmpty().isLength({ min: 5, max: 60});
    req.assert('senha_conf', 'Verifique a sua confirmação de senha').notEmpty().isLength({ min: 5, max: 60});
    req.assert('ocupacoes', 'Verifique as ocupações').isValidListaOcupacoes();

    
    /*
   
    
    req.assert('id_docente', 'docente é obrigatório').notEmpty();
    req.assert('id_titulo', 'titulo é obrigatório').notEmpty();
    req.assert('sexo', 'sexo é obrigatório').notEmpty();
    req.assert('id_nacionalidade', 'id_nacionalidade é obrigatória').notEmpty();
    req.assert('logradouro', 'logradouro é obrigatório').notEmpty();
    req.assert('bairro', 'bairro é obrigatório').notEmpty();
    req.assert('cep', 'cep é obrigatório').notEmpty();*/
    let erros = req.validationErrors();
           
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
        return;
    }
    req.body.ocupacoes = JSON.parse(req.body.ocupacoes);

    res.json(req.body);
});



module.exports = router;

