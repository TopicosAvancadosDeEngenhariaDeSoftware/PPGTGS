const bairroDao = require('../../dao/bairro-dao');

exports.recuperarBairroPorId = (req, res, next) => {
     req.checkParams('id_bairro', 'id_bairro é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }else{

        var bDao = new bairroDao(req.connection);
        bDao.recuperarBairroPorId(req.params.id_logradouro , (err, results) =>{
            if(err) res.status(400).json({resultado: null, erro: err});
            else{
                res.json({resultado : results, erro : null});
            }
        });
    }
}

exports.recuperarBairroPorNome = (req, res, next) => {
    req.checkParams('nome', 'nome é obrigatório').notEmpty();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }else{
        var bDao = new bairroDao(req.connection);
        bDao.recuperarBairroPorNome(req.params.nome , (err, results) =>{
            if(err) res.status(400).json({resultado: null, erro: err});
            else{
                res.json({resultado : results, erro : null});
            }
        });
    }
}