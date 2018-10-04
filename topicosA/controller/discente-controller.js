'use strict'

const paisesDao = require('../dao/pais-dao');
const titulosDao = require('../dao/titulo-dao');

exports.cadastrarDiscente = async (req, res, next) => {
        var pDao = new paisesDao(req.connection);
        pDao.recuperarPaises((err, resultado_paises) =>{
                if(err) return next(err);
                var tDao = new titulosDao(req.connection);
                tDao.recuperarTitulos((err, resultados_titulos) => {
                        if(err) return next(err);
                        res.render('discentes-registro', {paises : resultado_paises, titulos : resultados_titulos});
                })
                 
        });

        
}
