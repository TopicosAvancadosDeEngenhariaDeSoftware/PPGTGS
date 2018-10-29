'use strict'
const LogradouroDao = require('../../dao/Logradouro-dao');
const config = require('../../config/config');
const erros_mensagem = require('../../config/config-erros');
//const async = require("async");

exports.recuperarLogradouroPorId = (req, res, next) => {
    req.checkParams('id_logradouro', 'id é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }
    let id_logradouro = parseInt(req.params.id_logradouro);
    (new Promise(
        function (resolve, reject) {
                let lDao = new LogradouroDao(req.connection);
                lDao.recuperarLogradouroPorId(id_logradouro, (error, logradouro_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(logradouro_result);
                    }
                });
    })).then(result => {
        res.status(200).json({resultado: result, erro: null});

    }).catch(error => {
        next(error);
    });
}

exports.recuperarLogradouroPorNome = (req, res, next) => {
    req.checkParams('nome', 'nome é obrigatório').notEmpty();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }
    let nome = req.params.nome;

    (new Promise(
        function (resolve, reject) {
                let lDao = new LogradouroDao(req.connection);
                lDao.recuperarLogradouroPorNome(nome, (error, Logradouro_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(Logradouro_result);
                    }
                });
    })).then(result => {
        res.status(200).json({resultado: result, erro: null});

    }).catch(error => {
        next(error);
    });
}
exports.cadastrarLogradouro = (req, res, next) => {
         req.assert('nome', 'nome é obrigatório').notEmpty(); 
         let erros = req.validationErrors();
           
         if(erros){
             res.status(400).json({resultado: null, erro: erros});
         return;
         }
         (new Promise(
         function (resolve, reject) {   
                let nome = req.params.nome.toLowerCase();                     
                let lDao = new LogradouroDao(req.connection);
                lDao.inserirLogradouro(nome, (error, logradouro_result) => {
                if(error){
                     reject(error);
                 }else{
                     console.log('RESULTADO', logradouro_result);
                     resolve(logradouro_result);
                 }
             });
         })).then(result => {
         
             res.status(201).json({resultado: result, erro: null});
 
         }).catch(error => {
             next(error);
         });
 
   }
exports.editarLogradouro = (req, res, next) => {
        req.checkParams('id_logradouro', 'id é obrigatorio ser do tipo int').isInt();
        req.assert('nome', 'nome é obrigatório').notEmpty(); 
        let erros = req.validationErrors();
        if(erros){
            res.status(400).json({resultado: null, erro: erros});
        return;
        }
        (new Promise(
        function (resolve, reject) {
            id_logradouro = parseInt(req.params.id_logradouro);
            nome = req.params.nome;
            console.log('id', id_logradouro);
            let lDao = new LogradouroDao(req.connection);
            lDao.editarLogradouro(id_logradouro,nome, (error, Logradouro_result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(logradouro_result);
                }
            });
                
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
}

exports.excluirLogradouro = (req, res, next) => {
    req.checkParams('id_logradouro', 'id é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }
    let id_logradouro = parseInt(req.params.id_logradouro);
    console.log('id', id_logradouro);
    (new Promise(
    function (resolve, reject) {
            let lDao = new LogradouroDao(req.connection);
            lDao.excluirLogradouro(id_logradouro, (error, logradouro_result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(logradouro_result);
                }
            });
    })).then(result => {
        res.status(200).json({resultado: true, erro: null});
    }).catch(error => {
        next(error);
    });
}

