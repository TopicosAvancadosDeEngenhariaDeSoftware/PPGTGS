const cidadeDao = require('../../dao/estado-dao');

exports.recuperarEstadosPorPais = (req, res, next) => {
    req.checkParams('id_pais', 'id_pais é obrigatorio ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }else{

        var cDao = new cidadeDao(req.connection);
        cDao.recuperarEstadosPorPais(req.params.id_pais , (err, results) =>{
            if(err) res.status(400).json({resultado: null, erro: err});
            else{
                res.json({resultado : results, erro : null});
            }
        });


    }

}