'use strict'
const DiscenteDao = require('../dao/discente-dao');
const Discente = require('../model/Discente');
const Moment = require('moment');
const config = require('../config/config');
const erros_mensagem = require('../config/config-erros');
//const async = require("async");


exports.cadastrarDiscente = (req, res, next) => {
   // let id_tipo_usuario = req.id_tipo_usuario;

        console.log('aeee');

        req.assert('nome', 'nome é obrigatório').notEmpty(); 
        req.assert('data_nascimento', 'data de nascimento é obrigatório').notEmpty();
        req.assert('data_nascimento', 'data de nascimento incorreta').isISO8601();
        req.assert('rg', 'rg é obrigatório').notEmpty();
        req.assert('cpf', 'cpf é obrigatório').notEmpty();
        req.assert('username', 'username é obrigatório').notEmpty();
        req.assert('senha', 'senha é obrigatório').notEmpty();
        req.assert('email', 'email é obrigatório').notEmpty();
        req.assert('numero_residencia', 'número da residência é obrigatório').notEmpty();
        req.assert('id_docente', 'docente é obrigatório').notEmpty();
        req.assert('id_titulo', 'titulo é obrigatório').notEmpty();
        req.assert('id_sexo', 'sexo é obrigatório').notEmpty();

        let erros = req.validationErrors();
          
        if(erros){
            res.status(400).json({resultado: null, erro: erros});
        return;
        }

        //let params = req.body;
        
            
        (new Promise(
        function (resolve, reject) {
    
            let discente = new Discente();
            
            console.log('REQ.BODY', req.body);
            discente.construtorParametrosRequisicao(req.body);
            discente.situacao = config.situacao_discente.inativo;
            console.log('Discente::', discente);
                let disc = new DiscenteDao(req.connection);

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


exports.editarDiscente = (req, res, next) => {
    //let id_tipo_usuario = req.id_tipo_usuario;

    let id_tipo_usuario = 1;

    if(id_tipo_usuario == config.tipo_usuario.admin || id_tipo_usuario == config.tipo_usuario.coordenador || id_tipo_usuario == config.tipo_usuario.discente || id_tipo_usuario == config.tipo_usuario.secretaria){
        req.checkParams('id_discente', 'id é obrigatorio ser do tipo int').isInt();
        req.assert('nome', 'nome é obrigatório').notEmpty(); 
        req.assert('data_nascimento', 'data de nascimento é obrigatório').notEmpty();
        req.assert('data_nascimento', 'data de nascimento incorreta').isISO8601();
        req.assert('rg', 'rg é obrigatório').notEmpty();
        req.assert('cpf', 'cpf é obrigatório').notEmpty();
        req.assert('username', 'username é obrigatório').notEmpty();
        req.assert('senha', 'senha é obrigatório').notEmpty();
        req.assert('email', 'email é obrigatório').notEmpty();
        req.assert('numero_residencia', 'número da residência é obrigatório').notEmpty();
        req.assert('id_docente', 'docente é obrigatório').notEmpty();
        req.assert('id_titulo', 'titulo é obrigatório').notEmpty();
        req.assert('id_sexo', 'sexo é obrigatório').notEmpty();


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
                disc.editarDiscente(discente, (error, discente_result) => {
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

  exports.excluirDiscente = (req, res, next) => {
    //let id_tipo_usuario = req.id_tipo_usuario;

    let id_tipo_usuario = 1;

    if(id_tipo_usuario == config.tipo_usuario.admin || id_tipo_usuario == config.tipo_usuario.coordenador || id_tipo_usuario == config.tipo_usuario.discente || id_tipo_usuario == config.tipo_usuario.secretaria){
        req.checkParams('id_discente', 'id é obrigatorio ser do tipo int').isInt();
        let erros = req.validationErrors();
        if(erros){
            res.status(400).json({resultado: null, erro: erros});
        return;
        }
        let id_discente = parseInt(req.params.id_discente);
        console.log('id', id_discente);
       
        (new Promise(
        function (resolve, reject) {
                let disc = new DiscenteDao(req.connection);
                disc.excluirDiscente(id_discente, (error, discente_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(discente_result);
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: true, erro: null});
        }).catch(error => {
            next(error);
        });
    }
    else  res.status(401).json({resultado: null, erro: erros_mensagem.erro_usuario_permissao});
  
  }