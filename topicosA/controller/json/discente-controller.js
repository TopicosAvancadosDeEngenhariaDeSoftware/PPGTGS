'use strict'
const DiscenteDao = require('../../dao/discente-dao');
const Discente = require('../../model/Discente');
const Endereco = require('../../model/Endereco');
const config = require('../../config/config');
const erros_mensagem = require('../../config/config-erros');
const enderecoDao = require('../../dao/endereco-dao');
const logradouroDao = require('../../dao/logradouro-dao');
const bairroDao = require('../../dao/bairro-dao');
//const async = require("async");

exports.recuperarDiscenteId = (req, res, next) => {
    req.checkParams('id_discente', 'id é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }

    let id_discente = parseInt(req.params.id_discente);
    //console.log('id param', idparams);

    (new Promise(
        function (resolve, reject) {
                //console.log('Administrador');
                let av = new DiscenteDao(req.connection);
                av.recuperarDiscentePorId(id_discente, (error, discente_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(discente_result);
                    }
                });
    })).then(result => {
        //console.log(result); console.log('aq');
        res.status(200).json({resultado: result, erro: null});

    }).catch(error => {
        next(error);
    });
}

exports.recuperarDiscenteNome = (req, res, next) => {
    req.checkParams('nome', 'nome é obrigatório').notEmpty();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }

    let nome = parseInt(req.params.nome);
    //console.log('id param', idparams);

    (new Promise(
        function (resolve, reject) {
                //console.log('Administrador');
                let av = new DiscenteDao(req.connection);
                av.recuperarDiscentePorNome(nome, (error, discente_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(discente_result);
                    }
                });
    })).then(result => {
        //console.log(result); console.log('aq');
        res.status(200).json({resultado: result, erro: null});

    }).catch(error => {
        next(error);
    });
}

//cadastrar com endereço (fazer select para buscar se existe logradouro e bairro se nao existir cadastrar)
//cadastrar instituição e cargo docente
//pegar o id do discente, fazer o select para verificar se existe instituição, se não cadastrar
//pegar o id da instituição e salvar na tabela corresponde juntamente com o cargo.

exports.cadastrarDiscente = (req, res, next) => {
    // let id_tipo_usuario = req.id_tipo_usuario;
 
         req.assert('nome', 'nome é obrigatório').notEmpty(); 
         req.assert('data_nascimento', 'data de nascimento é obrigatório').notEmpty();
         req.assert('data_nascimento', 'data de nascimento incorreta').isISO8601();
         req.assert('username', 'username é obrigatório').notEmpty();
         req.assert('senha', 'senha é obrigatório').notEmpty();
         req.assert('email', 'email é obrigatório').notEmpty();
         req.assert('id_docente', 'docente é obrigatório').notEmpty();
         req.assert('id_titulo', 'titulo é obrigatório').notEmpty();
         req.assert('sexo', 'sexo é obrigatório').notEmpty();
         req.assert('id_nacionalidade', 'id_nacionalidade é obrigatória').notEmpty();
         req.assert('logradouro', 'logradouro é obrigatório').notEmpty();
         req.assert('bairro', 'bairro é obrigatório').notEmpty();
         req.assert('cep', 'cep é obrigatório').notEmpty();

         let erros = req.validationErrors();
           
         if(erros){
             res.status(400).json({resultado: null, erro: erros});
            return;
         }
 
         //let params = req.body;
         
         let discente = new Discente();
         console.log('REQ.BODY', req.body);
         discente.construtorParametrosRequisicao(req.body);

         discente.situacao = config.situacao_discente.ativo;
         console.log('Discente::', discente);

         let logradouro = req.body.logradouro;
         let bairro = req.body.bairro;
         let id_cidade = req.body.id_cidade;
    

         let id_logradouro = null;
         let id_bairro = null;

         console.log('Logradouro: ', logradouro);
         console.log('bairro: ', bairro);
         console.log('id_cidade: ',id_cidade);


         let verifica_logradouro = new logradouroDao(req.connection);
         let verifica_bairro = new bairroDao(req.connection);

         
         



         //PEGAR ID LOGRADOURO
        verifica_logradouro.recuperarLogradouroPorNome(logradouro, (error, result_logradouro) => {
            if(error){
                return res.status(500).json({resultado: null, erro: error});
            }
            else{
                if(result_logradouro == null ){ // não existe logradouro
                   //cadastrar o logradouro
                    console.log('nao existe logradouro');
                   (new Promise(
                        function(resolve,reject){
                            verifica_logradouro.inserirLogradouro(logradouro, (error, result_cadastro_logradouro)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    resolve(result_cadastro_logradouro);
                                }
                            });
                    })).then(result => {
                        id_logradouro = result.insertId; //pega id_logradouro
                        console.log('esse id_logradouro: ',id_logradouro);

                    }).catch(error => {
                        next(error);
                    });
 

                }else{ 
                    //se já existir logradouro, pega o id logradouro
                    id_logradouro = result_logradouro.id_logradouro;
                    console.log('id_logradouro: ',id_logradouro);
                    ////PEGAR ID Bairro
                    verifica_bairro.recuperarBairroPorNome(bairro, (error, result_bairro) => {
                        if(error){
                            return res.status(500).json({resultado: null, erro: error});
                        }
                        else{
                            if(result_bairro == null ){ // não existe bairro
                            //cadastrar bairro
                                console.log('nao existe bairro');
                            (new Promise(
                                    function(resolve,reject){
                                        verifica_bairro.inserirBairro(bairro, (error, result_cadastro_bairro)=> {
                                            if(error){
                                                reject(error);
                                            }else{
                                                resolve(result_cadastro_bairro);
                                            }
                                        });
                                })).then(result => {
                                    id_bairro = result.insertId; //pega id_logradouro
                                    console.log('esse id_bairro: ',id_bairro);

                                }).catch(error => {
                                    next(error);
                                });
            

                            }else{ 
                                //se já existir logradouro, pega o id logradouro
                                id_bairro = result_bairro.id_bairro;
                                console.log('id_bairro: ',id_bairro);
                                //cadastrar endereço
                                (new Promise(
                                    function(resolve, reject){
                                    let endereco = new Endereco();
                                    endereco.construtorParametrosRequisicao(req.body);
                                    endereco.id_logradouro = id_logradouro;
                                    endereco.id_bairro = id_bairro;
                                    console.log('endereco: ',endereco);
                                    let e = new enderecoDao(req.connection);
                                    e.inserirEndereco(endereco, (error, endereco_result) => {
                                        if(error){
                                            reject(error);
                                        }else{
                                            resolve(endereco_result);
                                        }
                                    })
                                    }
                                )).then(result => {
                                    let id_endereco = result.insertId;
                                    console.log('id endereco: ', id_endereco);
                                    (new Promise(
                                        function (resolve, reject) {
                                                discente.id_endereco = id_endereco;
                                                let disc = new DiscenteDao(req.connection);
                                                console.log('Discente pronto: ', discente);
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
                                }).catch(error => {
                                    next(error);
                                });
                            }
                        }
                    });
                }
            }
         });

        // console.log('discente: ', discente);
  
         /*
         (new Promise(
         function (resolve, reject) {
                 discente.id_endereco = id_endereco;
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
         }); */
 
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