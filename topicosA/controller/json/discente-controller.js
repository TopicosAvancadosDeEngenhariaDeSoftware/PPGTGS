'use strict'
const DiscenteDao = require('../../dao/discente-dao');
const Discente = require('../../model/Discente');
const Endereco = require('../../model/Endereco');
const config = require('../../config/config');
const erros_mensagem = require('../../config/config-erros');
const enderecoDao = require('../../dao/endereco-dao');
const logradouroDao = require('../../dao/logradouro-dao');
const bairroDao = require('../../dao/bairro-dao');
const instituicaoDao = require('../../dao/instituicao-dao');
const cargoDiscenteDao = require('../../dao/cargo-discente-dao');
const DiscenteCargoInstituicaoDao = require('../../dao/discente-cargo-instituicao-dao');
const async = require("async");

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

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('nome', "Verifique seu nome").isLength({ min: 1, max: 40}); 
    req.assert('sobrenome', 'Sobrenome é obrigatório').notEmpty();
    req.assert('sobrenome', "Verifique seu sobrenome").isLength({ min: 1, max: 60}); 
    req.assert('data_nascimento', 'Data de nascimento é obrigatório').notEmpty();
    req.assert('data_nascimento', 'Verifique sua data de dascimento').isISO8601();
    req.assert('id_nacionalidade', 'Nacionalidade é obrigatório').notEmpty();
    req.assert('id_sexo', 'Sexo é obrigatório').notEmpty();
    req.assert('endereco_id_pais', 'País é obrigatório').notEmpty();
    if(req.body.endereco_id_pais != undefined && req.body.endereco_id_pais != null && parseInt(req.body.endereco_id_pais) == 1){
        req.assert('endereco_id_cidade', 'Cidade é obrigatório').notEmpty();
        req.assert('endereco_cep', 'Cep é obrigatório').notEmpty().isLength({ min: 1, max: 20}); 
        req.assert('endereco_bairro', 'Bairro é obrigatório').notEmpty().isLength({ min: 1, max: 40});
        req.assert('endereco_logradouro', 'Logradouro é obrigatório').notEmpty().isLength({ min: 1, max: 60});
        req.assert('endereco_num_residencia', 'Número da residência é obrigatório').notEmpty().isLength({ min: 1, max: 20});
    }
    req.assert('username', 'Username é obrigatório').notEmpty();
    req.assert('id_titulo', 'Titulo é obrigatório').notEmpty();
    //req.assert('id_orientador', 'Orientador é obrigatório').notEmpty();
    req.assert('email', 'Verifique seu email').notEmpty().isEmail();
    req.assert('senha', 'Verifique a sua senha').notEmpty().isLength({ min: 5, max: 60});
    req.assert('senha_conf', 'Verifique a sua confirmação de senha').notEmpty().isLength({ min: 5, max: 60});
    //req.assert('ocupacoes', 'Verifique as ocupações').isValidListaOcupacoes();


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

         let logradouro = req.body.endereco_logradouro;
         let bairro = req.body.endereco_bairro;
         let id_cidade = parseInt(req.body.id_cidade);
      
         let id_logradouro = null;
         let id_bairro = null;

         let email = req.body.email;

 
         console.log('Logradouro: ', logradouro);
         console.log('bairro: ', bairro);
         console.log('id_cidade: ',id_cidade);
        

         let verifica_logradouro = new logradouroDao(req.connection);
         let verifica_bairro = new bairroDao(req.connection);
        
         
         let verifica_discente = new DiscenteDao(req.connection);



        verifica_discente.recuperarDiscentePorEmail(email, (error, result_existe_discente) => {
            if(error){
                return res.status(500).json({resultado: null, erro: error});
            }
            else{

                if(result_existe_discente == null){

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

                                                //inserir discente
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

                                                        //res.status(201).json({resultado: result, erro: null});

                                                        let id_discente_cadastrado = result.id_discente;
                                                        console.log('id discente cad: ', id_discente_cadastrado);

                                                        //cadastrar cargos instituição discente
                                                        //verificar se id_instituição igual a 0 -> se for, então cadastrar instituicao
                                                        // se não, pega o id da instituição
                            
                                                    
                                                        let verifica_instituicao = new instituicaoDao(req.connection);

                                                        let id_instituicao_cadastrada = [];
                
                                                        console.log('ocupacoes: ', req.body.ocupacoes);
                                                    
                                                        let i = 0;

                                                        //CADASTRAR INSTITUIÇÃO  ----- RETORNA UMA LISTA DE INSTITUICOES 
                                                        (new Promise(function(resolve,reject){
                                                            async.each(req.body.ocupacoes, function(result, callback){ 
                                                                console.log('i = ', i);
                                                                console.log('resultado: ', result);
                                                                if(result.id_instituicao == 0){ //precisa cadastrar instituicao
                                                                    (new Promise(function(resolve,reject){
                                                                        verifica_instituicao.inserirInstituicao(result.instituicao.nome, result.instituicao.sigla, result.instituicao.tipo_instituicao, (error, result_cadastro_instituicao)=> {
                                                                            if(error){
                                                                                callback(error);
                                                                            }else{
                                                                                console.log('cadastrou: ',result_cadastro_instituicao.insertId);
                                                                                id_instituicao_cadastrada[i] = result_cadastro_instituicao.insertId;
                                                                                i++;
                                                                                callback();
                                                                            }
                                                                        });

                                                                    })).then(result => {
                                                                        resolve(id_instituicao_cadastrada);
                                                            
                                                                    }).catch(error => {
                                                                        next(error);
                                                                    });
                                                                }
                                                                else{
                                                                    id_instituicao_cadastrada[i] = result.id_instituicao;
                                                                    console.log('id_instituicao: ',id_instituicao_cadastrada);
                                                                    i++;
                                                                    callback();
                                                                }

                                                            }, function(err){
                                                                if(!err){
                                                                    console.log('FINAL: ', id_instituicao_cadastrada);
                                                                    resolve(id_instituicao_cadastrada);
                                                                }else{
                                                                    reject(err);
                                                                }
                                                            
                                                            });


                                                        })).then(result => {
                                                            //CADASTRAR CARGO --- RETORNA LISTA DE IDS DE CARGOS
                                                            //buscar no banco se já existe o cargo se não, cadastra o cargo e retorna id
                                                           

                                                            let verifica_cargo_discente = new cargoDiscenteDao(req.connection);
                                                            let ocup = req.body.ocupacoes;
                                                            let id_cargo_discente = [];

                                                            let k = 0;

                                                    
                                        

                                                        (new Promise(function(resolve,reject) {
                                                            async.each(req.body.ocupacoes, function(result, callback){ 
                                                                console.log('K: ',k);
                                                                console.log('result cargo: ', result);
                                                                
                                                                
                                                            
                                                        
                                                            (new Promise(function(resolve,reject){
                                                        
                                                                    verifica_cargo_discente.recuperarCargoDiscentePorNome(result.cargo, (error, result_cargo_discente) => {
                                                                        if(error){
                                                                            return res.status(500).json({resultado: null, erro: error});
                                                                        }
                                                                        else{
                                                                            if(result_cargo_discente == null ){ // não existe este cargo cadastrado
                                                                                //cadastrar o cargo no bd
                                                                                console.log('nao existe este cargo no bd');
                                                                                (new Promise(
                                                                                    function(resolve,reject){
                                                                                        verifica_cargo_discente.inserirCargoDiscente(result.cargo, (error, result_cadastro_cargo_discente)=> {
                                                                                            if(error){
                                                                                                reject(error);
                                                                                            }else{
                                                                                                resolve(result_cadastro_cargo_discente);
                                                                                            }
                                                                                        });
                                                                                })).then(result => {
                                                                                    id_cargo_discente[k] = result.insertId; //pega id_cargo_discente cadastrado
                                                                                    console.log('esse id_cargo discente: ',id_cargo_discente);
                                                                                    k++;
                                                                                    callback();
                                                                    
                                                                                }).catch(error => {
                                                                                    next(error);
                                                                                });
                                                                                
                                                                                
                                                                    
                                                                            }else{ 
                                                                                //se já existir cargo, pega o id cargo
                                                                                id_cargo_discente[k] = result_cargo_discente.id_cargo_discente;
                                                                                console.log('id_cargo: ',id_cargo_discente);
                                                                                k++;
                                                                                callback();                                                                }
                                                                        }
                                                                    });
                                                        
                                                        
                                                                })).then(result => {
                                                                    resolve(id_cargo_discente);
                                                        
                                                                }).catch(error => {
                                                                    next(error);
                                                                });
                                                        
                                                                
                                                        
                                                            }, function(err){
                                                                if(!err){
                                                                    console.log('FINAL cargoo:  ', id_cargo_discente);
                                                                    resolve(id_cargo_discente);
                                                                }else{
                                                                    reject(err);
                                                                }
                                                            
                                                            });  
                                                            
                                                            
                                                        
                                                            })).then(result => {
                                                                // com a lista de id_instituicao_cadastrada e id_cargo_discente e id_discente,  cadastra DiscenteCargoInsituicao
                                                                

                                                                let verifica_discente_cargo_instituicao = new DiscenteCargoInstituicaoDao(req.connection);

                                                                console.log('Instituições: ', id_instituicao_cadastrada);
                                                                console.log('Cargo discente: ', id_cargo_discente);
                                                                console.log('tam lista: ', id_instituicao_cadastrada.length);
                                                                console.log('DISCENTEE: ', id_discente_cadastrado);

                                                                
                                                                let lista_inst_carg = [];

                                                                for(var j = 0; j < id_instituicao_cadastrada.length; j++){
                                                                    var obj = new Object();
                                                                    obj.inst = id_instituicao_cadastrada[j];
                                                                    obj.carg = id_cargo_discente[j];
                                                                    lista_inst_carg.push(obj);
                                                                }
                                                                
                                                                console.log('obj: ',lista_inst_carg);

                                                                (new Promise(function(resolve,reject){  
                                                                    async.each(lista_inst_carg, function(result, callback){ 

                                                                            verifica_discente_cargo_instituicao.inserirDiscenteCargoInstituicao(id_discente_cadastrado, result.inst, result.carg, (error, result_disc_cargo)=> {
                                                                                if(error){
                                                                                    reject(error);
                                                                                }else{
                                                                                    console.log('cadastrou');
                                                                                    callback();
                                                                                }
                                                                            });
   
                                                                    }, function(err){
                                                                        if(!err){
                                                                            console.log('Cad feitos');
                                                                            resolve(true);
                                                                        }else{
                                                                            reject(err);
                                                                        }
                                                                    
                                                                    });
                                                                
                                                                        
                                                                    })).then(result => {
                                                                        //resolve(result_disc_cargo);
                                                                        console.log('cad ok');
                                                                        res.status(201).json({resultado: result, erro: null});
                                                                    }).catch(error => {
                                                                        next(error);
                                                                });   
                                                                    

                                                                
                                                            
                                                            }).catch(error => {
                                                                next(error);
                                                            });

                                                        }).catch(error => {
                                                            next(error);
                                                        });
                

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
                }else{
                    return res.status(500).json({resultado: null, erro: "Este e-mail já possui cadastro!"});
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