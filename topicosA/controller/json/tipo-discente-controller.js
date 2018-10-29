'use strict'
const TipoDiscenteDao = require('../../dao/tipo-discente-dao');


 exports.RecuperarTipoDiscente = (req, res, next) => {
    req.checkParams('id_tipo_discente', 'id é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }

    let id_tipo_discente = parseInt(req.params.id_tipo_discente);
    //console.log('id param', idparams);

    
        (new Promise(
        function (resolve, reject) {
                //let tipo_disc = new tipoDiscenteDao(req.connection);
                let disc = new TipoDiscenteDao(req.connection);

                disc.buscarTipoDiscenteId(id_tipo_discente, (error, result_tipo)=> {
                    if(error){
                        reject(error);
                    }else{
                        console.log('Result: ', result_tipo);
                       resolve(result_tipo);
                    }
                });      
        })).then(result => {

            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
  }