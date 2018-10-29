const cidadeDao = require('../../dao/cidade-dao');

exports.recuperarCidadesPorEstado = (req, res, next) => {
    req.checkParams('id_estado', 'id_estado é obrigatorio ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }else{

        var cDao = new cidadeDao(req.connection);
        cDao.recuperarCidadesPorEstado(req.params.id_estado , (err, results) =>{
            if(err) res.status(400).json({resultado: null, erro: err});
            else{
                res.json({resultado : results, erro : null});
            }
        });


    }

}