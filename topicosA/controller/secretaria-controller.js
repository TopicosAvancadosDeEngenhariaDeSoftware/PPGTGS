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

//dependo da organização das views Discentes, desnecessário
exports.recuperarDiscentesAceitos = async (req, res, next) => {
        var dDao = new discenteDao(req.connection);
        dDao.recuperarDiscentesAceitos((err, resultados) =>{
                if(err) next(err);
                res.render('secretaria-aceitos', {discentes : resultados});
        });
};

exports.aprovarDiscente = async (req, res, next) => {
        var dDao = new discenteDao(req.connection);
        dDao.aprovarDiscente((err, resultados) =>{
                if(err) next(err);
                res.render('secretaria-aprovar', {discentes : resultados});
        });
}


//SECRETARIA CLEBER
exports.carregarTelaAprovacoes= async (req, res, next) => {
        res.render('secretaria-aprovacao', {idSituacao : 0});
    }
    exports.carregarTelaHome= async (req, res, next) => {
        res.redirect('/secretaria/aprovacoes');
}