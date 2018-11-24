'use strict'

const discenteDao = require('../dao/discente-dao');


const config = require('../config/config');

exports.recuperarDiscentesPendentes = async (req, res, next) => {
        var dDao = new discenteDao(req.connection);
        dDao.recuperarDiscentesPendentes((err, resultados) =>{
                if(err) next(err);
                res.render('secretaria-pendentes', {discentes : resultados});
        });
};

exports.aprovarDiscente = async (req, res, next) => {
        var dDao = new discenteDao(req.connection);
        dDao.aprovarDiscente((err, resultados) =>{
                if(err) next(err);
                res.render('secretaria-aprovar', {discentes : resultados});
        });
}