'use strict'

const config = require('../config/config');

const discenteDao = require('../dao/discente-dao');


exports.carregarTelaAprovacoes= async (req, res, next) => {
    res.render('secretaria-aprovacao', {status_Cadastro : 0, id_tipo_usuario: req.id_tipo_usuario, id_usuario: req.id_usuario});
}

exports.carregarTelaHome= async (req, res, next) => {
    res.redirect('/secretaria/aprovacoes');
}


/*
exports.carregarTelaAprovacoes= async (req, res, next) => {
    res.render('secretaria-aprovacao', {idSituacao : 0});
}

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

*/