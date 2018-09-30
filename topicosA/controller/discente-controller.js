'use strict'
const DiscenteDao = require('../dao/discente-dao');
const Discente = require('../model/Discente');
const Moment = require('moment');
const config_usuario = require('../config/config');
//const async = require("async");


exports.cadastrarDiscente = (req, res, next) => {
   // let id_tipo_usuario = req.id_tipo_usuario;

        console.log('aeee');
        
        req.assert('nome', 'nome é obrigatório').notEmpty();
        //verificar data nascimento
        req.assert('rg', 'rg é obrigatório').notEmpty();
        req.assert('cpf', 'cpf é obrigatório').notEmpty();
        req.assert('username', 'username é obrigatório').notEmpty();
        req.assert('senha', 'senha é obrigatório').notEmpty();
        req.assert('email', 'email é obrigatório').notEmpty();
        req.assert('numero_residencia', 'número da residência é obrigatório').notEmpty();
        
       

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
            console.log(discente);
                let disc = new discenteDao(req.connection);
                disc.inserirDiscente(discente, (error, discente_result) => {
                    if(error){
                        reject(error);
                    }else{
                        console.log('RESULTADO', discente_result);
                        resolve(discente_result);
                    }
                });
                
            
        })).then(result => {
        
            //params.id = result.id;
            res.status(201).json({resultado: result, erro: null});

            //console.timeEnd();

        }).catch(error => {
            next(error);
        });


  
  }