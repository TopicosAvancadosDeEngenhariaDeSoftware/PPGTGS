'use strict'
const config = require('../../config/config');
const async = require("async");
const moment = require('moment');

const Discente = require('../../model/Discente');
const DiscenteDao = require('../../dao/discente-dao');

exports.aprovarDiscente = (req, res, next) => {
    //let id_tipo_usuario = req.id_tipo_usuario;
    
    let id_tipo_usuario = 1;

    if(id_tipo_usuario == config.tipo_usuario.admin || id_tipo_usuario == config.tipo_usuario.coordenador || id_tipo_usuario == config.tipo_usuario.discente || id_tipo_usuario == config.tipo_usuario.secretaria){
        req.checkParams('id_discente', 'id é obrigatorio ser do tipo int').isInt();

        let erros = req.validationErrors();
        if(erros){
            res.status(400).json({resultado: null, erro: erros});
            return;
        }

        //let params = req.body;
        (new Promise(
        function (resolve, reject) {
            let discente = new Discente();
            
            discente.construtorParametrosRequisicao(req.body);

            discente.id_discente = parseInt(req.params.id_discente);
            
            console.log('id', discente.id_discente);

            let disc = new DiscenteDao(req.connection);
            disc.aprovarDiscente(discente, (error, discente_result) => {//Aprova Cadastro
                if(error){
                    reject(error);
                }else{
                    resolve(discente_result);
                }
            });
                
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
    }
    else  res.status(401).json({resultado: null, erro: erros_mensagem.erro_usuario_permissao});
}

//1 -  Cadatro Aceito
//0) - Não Aceito
exports.recuperarDiscentePorStatusCadastro = (req, res, next) => {

req.assert('status_Cadastro', 'status é obrigatório').notEmpty();
req.assert('status_Cadastro', 'status é obrigatório ser do tipo int').isInt();

let erros = req.validationErrors();
if(erros){
    res.status(400).json({resultado: null, erro: erros});
return;
}

let status_Cadastro = parseInt(req.params.status_Cadastro); 

(new Promise(
    function (resolve, reject) {
           
        let disc = new DiscenteDao(req.connection);
        disc.recuperarDiscentePorStatusCadastro(status_Cadastro, (error, disc_result) => {
            if(error){
                reject(error);
            }else{
                resolve(disc_result);  
            }
        });      
                   
    })).then(result => {
        res.status(200).json({resultado: result, erro: null});
    }).catch(error => {
        next(error);
    });
}
