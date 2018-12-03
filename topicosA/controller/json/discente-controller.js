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
const paisDao = require('../../dao/pais-dao');
const tituloDao = require('../../dao/titulo-dao');
const tipoDiscenteDao = require('../../dao/tipo-discente-dao');
const DiscenteTipoDiscenteDao = require('../../dao/discente-tipo-discente-dao');
const docenteDao = require('../../dao/docente-dao');
const async = require("async");
var CPF = require("cpf_cnpj").CPF;
const moment = require('moment');

exports.recuperarDiscenteId = (req, res, next) => {
    req.checkParams('id_discente', 'id é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }

    let id_discente = parseInt(req.params.id_discente);
    //console.log('id param', idparams);

    let pacote = {};
     let resposta = [];
     let dados_pessoais = {};
     let lista_ocupacoes = {};
     let resp = [];

     let dados_pessoais_discente;

    (new Promise(
        function (resolve, reject) {
                //console.log('Administrador');
                let d = new DiscenteDao(req.connection);
                d.recuperarDiscentePorId(id_discente, (error, discente_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(discente_result);
                    }
                });
    })).then(result => {
        //console.log(result); console.log('aq');
        //res.status(200).json({resultado: result, erro: null});
        
        dados_pessoais_discente = result;

        dados_pessoais = {
            id_discente : dados_pessoais_discente.id_discente,
            nome : dados_pessoais_discente.nome,
            sobrenome : dados_pessoais_discente.sobrenome,
            data_nascimento : dados_pessoais_discente.data_nascimento,
            rg : dados_pessoais_discente.rg,
            cpf : dados_pessoais_discente.cpf,
            username : dados_pessoais_discente.username,
            senha : dados_pessoais_discente.senha,
            link_lattes : dados_pessoais_discente.link_lattes,
            email : dados_pessoais_discente.email,
            id_endereco : dados_pessoais_discente.id_endereco,
            numero_residencia : dados_pessoais_discente.numero_residencia,
            complemento : dados_pessoais_discente.complemento,
            id_docente : dados_pessoais_discente.id_docente,
            isAceito : dados_pessoais_discente.isAceito,
            situacao : dados_pessoais_discente.situacao,
            id_titulo : dados_pessoais_discente.id_titulo,
            sexo : dados_pessoais_discente.sexo,
            telefone : dados_pessoais_discente.telefone,
            passaporte : dados_pessoais_discente.passaporte,
            id_nacionalidade : dados_pessoais_discente.id_nacionalidade
        }

        console.log('dados pessoais: ', dados_pessoais);

        (new Promise(
            function (resolve, reject) {
                    //console.log('Administrador');
                    let dc = new DiscenteCargoInstituicaoDao(req.connection);
                    dc.recuperaroDiscenteCargoInstituicaoPorIdDiscente(id_discente, (error, discente_cargo_instituicao_result) => { //retorna lista de cargos e instituição do discente
                        if(error){
                            reject(error);
                        }else{
                            console.log('Discente cargo instituicao: ', discente_cargo_instituicao_result);
                            resolve(discente_cargo_instituicao_result);
                        }
                    });
        })).then(result_lista_instituicao_cargo => {
            console.log('result: ', result_lista_instituicao_cargo[0].id_discente,result_lista_instituicao_cargo[0].id_instituicao, result_lista_instituicao_cargo[0].id_cargo_discente, result_lista_instituicao_cargo[1].id_instituicao);
            //pegar a lista de instituições e retornar as instituicoes
            //pegar lista de cargos e retornar os cargos 
           

            (new Promise(function (resolve, reject) {
                async.each(result_lista_instituicao_cargo, function(result, callback){

                    (new Promise(
                        function (resolve, reject) {
                                //console.log('Administrador');     
                                let c = new cargoDiscenteDao(req.connection);
                                c.recuperarCargoDiscentePorId(result.id_cargo_discente, (error, discente_cargo_result) => {
                                    if(error){
                                        reject(error);
                                    }else{

                                        let i = new instituicaoDao(req.connection);
                                        i.recuperarInstituicaoPorId(result.id_instituicao, (error, discente_instituicao_result) => { //buscar os dados da instituicao
                                            if(error){
                                                reject(error);
                                            }else{
                                            
                                                lista_ocupacoes ={
                                                    cargo : {
                                                        id_cargo: result.id_cargo_discente,
                                                        nome_cargo: discente_cargo_result.nome,
                                                        instituicao : {
                                                            id_instituicao: result.id_instituicao,
                                                            nome_instituicao: discente_instituicao_result.nome,
                                                            sigla_intituicao: discente_instituicao_result.sigla,
                                                            tipo_instituicao: discente_instituicao_result.id_tipo_instituicao
                                                        }
                                                    }
                                                }

                                                
                                                resposta.push(lista_ocupacoes);
                                                resolve(resposta);
                                            }
                                        });
                                    }
                                });

                                    
                                 
                    })).then(result => {

                        callback();


                    }).catch(error => {
                        callback(error);
                    }); 

                }, function(err){
                    if(!err){
                        console.log('FINAL: ', resposta);
                       
                        resolve(resposta);
                    }else{
                        reject(err);
                    }
                
                });
            })).then(result => {
                dados_pessoais.lista_ocupacoes = result;
                //res.status(200).json({resultado: dados_pessoais, erro: null});

                (new Promise(
                    function (resolve, reject) {
                            //console.log('Administrador');
                            let dtc = new DiscenteTipoDiscenteDao(req.connection);
                            dtc.recuperarDiscenteTipoDiscentePorIdDiscente(id_discente, (error, discente_tipo_discente_result) => { //retorna lista de cargos e instituição do discente
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Discente cargo instituicao: ', discente_tipo_discente_result);
                                    resolve(discente_tipo_discente_result);
                                }
                            });
                })).then(result_discente_tipo_discente => {
                    //console.log('result: ', result_lista_instituicao_cargo[0].id_discente,result_lista_instituicao_cargo[0].id_instituicao, result_lista_instituicao_cargo[0].id_cargo_discente, result_lista_instituicao_cargo[1].id_instituicao);
                    //pegar a lista de instituições e retornar as instituicoes
                    //pegar lista de cargos e retornar os cargos 
                   
        
                    (new Promise(function (resolve, reject) {
                        async.each(result_discente_tipo_discente, function(result, callback){
        
                            (new Promise(
                                function (resolve, reject) {
                                        //console.log('Administrador');     
                                        let td = new tipoDiscenteDao(req.connection);
                                        td.buscarTipoDiscenteId(result.id_tipo_discente, (error, tipo_discente_result) => {
                                            if(error){
                                                reject(error);
                                            }else{
                                                let tipo_discente = {};
                                               

                                                console.log('tipo discente: ', tipo_discente_result);

                                                tipo_discente = {
                                                    data_inicial : result.data_inicial,
                                                    data_final : result.data_final,
                                                    isAtual : result.isAtual,
                                                    id_tipo_discente : tipo_discente_result.id_tipo_discente,
                                                    nome_tipo_discente : tipo_discente_result.nome
                                                }

                                                
                                                resp.push(tipo_discente);
                                                resolve(resp);
                                            }
                                        });
        
                                            
                                         
                            })).then(result => {
                                console.log('oi');
                                callback();
        
        
                            }).catch(error => {
                                console.log('error: ', error);
                                callback(error);
                            }); 
        
                        }, function(err){
                            if(!err){
                                console.log('FINAL: ', resp);
                               
                                resolve(resp);
                            }else{
                                console.log('error: ', err);
                                reject(err);
                            }
                        
                        });
                    })).then(result => {
                        dados_pessoais.tipo_discente = result;
                        //res.status(200).json({resultado: dados_pessoais, erro: null});
                        
                        (new Promise(
                            function (resolve, reject) {
                                    //console.log('Administrador');     
                                    let tit = new tituloDao(req.connection);
                                    tit.recuperarTituloId(dados_pessoais_discente.id_titulo, (error, titulo_discente) => {
                                        if(error){
                                            reject(error);
                                        }else{
                                            
                                           console.log('titulo: ', titulo_discente);
                                           dados_pessoais.titulo = titulo_discente.nome;
                                            resolve(dados_pessoais);
                                        }
                                    });      
                        })).then(result => {
                            //res.status(200).json({resultado: dados_pessoais, erro: null});

                            (new Promise(
                                function (resolve, reject) {
                                        //console.log('Administrador');     
                                        let doc = new docenteDao(req.connection);
                                        doc.recuperarDocenteId(dados_pessoais_discente.id_docente, (error, docente_discente) => {
                                            if(error){
                                                reject(error);
                                            }else{
                                                
                                            console.log('docente: ', docente_discente);
                                            dados_pessoais.orientador = docente_discente.nome;
                                                resolve(dados_pessoais);
                                            }
                                        });      
                            })).then(result => {
                                //res.status(200).json({resultado: dados_pessoais, erro: null});



                                (new Promise(
                                    function (resolve, reject) {
                                            //console.log('Administrador');     
                                            let nac = new paisDao(req.connection);
                                            nac.recuperarPaisId(dados_pessoais_discente.id_nacionalidade, (error, nacionalidade_discente) => {
                                                if(error){
                                                    reject(error);
                                                }else{
                                                    
                                                console.log('nacio: ', nacionalidade_discente);
                                                dados_pessoais.nacionalidade = nacionalidade_discente.nacionalidade;
                                                    resolve(dados_pessoais);
                                                }
                                            });      
                                })).then(result => {
                                    res.status(200).json({resultado: dados_pessoais, erro: null});
                                }).catch(error => {
                                    console.log('error: ', error);
                                    callback(error);
                                }); 



                            }).catch(error => {
                                console.log('error: ', error);
                                callback(error);
                            }); 

                        }).catch(error => {
                            console.log('error: ', error);
                            callback(error);
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

    }).catch(error => {
        next(error);
    });
}

exports.recuperarDiscenteNome = (req, res, next) => {
    req.checkParams('id_situacao', 'id_situacao é obrigatorio ser do tipo int').isInt();
    let erros = req.validationErrors();
    if(erros){
      res.status(400).json(erros);
      return;
    }

    let nome = req.query.nome;
    if(nome == undefined || nome == null) nome = "";

    let situacao = parseInt(req.params.id_situacao);
    console.log('Nome: ', nome);
    console.log('Situacao: ', situacao);
    let pacote = {};
    let resposta = [];
    let dados_pessoais = {};
    let lista_ocupacoes = {};
    let resp = [];

    let dados_pessoais_discente;

    (new Promise(
        function (resolve, reject) {
                //console.log('Administrador');
                let d = new DiscenteDao(req.connection);
                d.recuperarDiscentePorNome(nome, situacao, (error, discente_result) => {
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
    req.body.data_nascimento = moment(req.body.data_nascimento, "DD/MM/YYYY").format("YYYY-MM-DD");
    //console.log(req.body.data_nascimento); return;

    console.log('req: ', req.body);
    

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
        //req.assert('rg', 'RG é obrigatório').notEmpty();
        //req.assert('cpf', 'CPF é obrigatório').notEmpty();

        if(req.body.cpf != null && req.body.cpf != undefined && req.body.cpf.length > 0 && CPF.isValid(req.body.cpf) != true){
            var responseJSON = new Object();
            var erro_lista = [];
            var erro = new Object();
            erro.param = "cpf";
            erro.msg = 'CPF em formato inválido';
            erro_lista.push(erro);
            responseJSON.erro = erro_lista;

            return res.status(400).json({resultado: null, erro : erro_lista});
        }
        
        req.assert('endereco_id_cidade', 'Cidade é obrigatório').notEmpty();
        req.assert('endereco_cep', 'Cep é obrigatório').notEmpty().isLength({ min: 1, max: 20}); 
        req.assert('endereco_bairro', 'Bairro é obrigatório').notEmpty().isLength({ min: 1, max: 40});
        req.assert('endereco_logradouro', 'Logradouro é obrigatório').notEmpty().isLength({ min: 1, max: 60});
        req.assert('endereco_num_residencia', 'Número da residência é obrigatório').notEmpty().isLength({ min: 1, max: 20});
        
    }
    else if(req.body.endereco_id_pais != undefined && req.body.endereco_id_pais != null && parseInt(req.body.endereco_id_pais) != 1){
        req.assert('passaporte', 'Passaporte é obrigatório').notEmpty();
    }
    req.assert('id_titulo', 'Titulo é obrigatório').notEmpty();
   // req.assert('id_orientador', 'Orientador é obrigatório').notEmpty();
    req.assert('email', 'Verifique seu email').notEmpty().isEmail();
    req.assert('senha', 'Verifique a sua senha').notEmpty().isLength({ min: 5, max: 60});
    req.assert('senha_conf', 'Verifique a sua confirmação de senha').notEmpty().isLength({ min: 5, max: 60});
    //req.assert('ocupacoes', 'Verifique as ocupações').isValidListaOcupacoes();

    req.body.ocupacoes = JSON.parse(req.body.ocupacoes);
    console.log(req.body.ocupacoes);
    
         let erros = req.validationErrors();
           
         if(erros){
            return res.status(400).json({resultado: null, erro: erros});
            
         }

         let senha = req.body.senha;
         let senha_conf = req.body.senha_conf;

         if(senha != senha_conf){
            var responseJSON = new Object();
            var erro_lista = [];
            var erro = new Object();
            erro.param = "senha_conf";
            erro.msg = 'Senhas não conferem.';
            erro_lista.push(erro);
            responseJSON.erro = erro_lista;

            return res.status(400).json({resultado: null, erro : erro_lista});
         }
 
         //let params = req.body;
         
         let discente = new Discente();
         console.log('REQ.BODY', req.body);
         discente.construtorParametrosRequisicao(req.body);

         discente.situacao = config.situacao_discente.ativo;
         console.log('Discente::', discente);

         let logradouro = req.body.endereco_logradouro;
         let bairro = req.body.endereco_bairro;
         let id_cidade = parseInt(req.body.endereco_id_cidade);
      
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
                            if(result_logradouro == null || result_logradouro == undefined ){ // não existe logradouro
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

                            }
                                ////PEGAR ID Bairro
                                verifica_bairro.recuperarBairroPorNome(bairro, (error, result_bairro) => {
                                    if(error){
                                        return res.status(500).json({resultado: null, erro: error});
                                    }
                                    else{
                                        if(result_bairro == null || result_logradouro == undefined ){ // não existe bairro
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
                                            
                                        }
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
                                                                        verifica_instituicao.inserirInstituicao(result.instituicao.nome, result.instituicao.sigla, result.instituicao.id_tipo_instituicao, (error, result_cadastro_instituicao)=> {
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
                                                                        //console.log('cad ok');
                                                                        //res.status(201).json({resultado: result, erro: null});

                                                                        let id_tipo_discente = parseInt(req.body.id_tipo_discente);


                                                                        let date_atual = moment();
                                                                        let mes = date_atual.month()+1;
                                                                        let date_certa = date_atual.year()+"/"+mes+"/"+date_atual.date();
                                                                        console.log('date atual: ', date_atual, discente.id_discente, discente.id_tipo_discente, date_certa);

                                                                        (new Promise(
                                                                            function (resolve, reject) {
                                                                                    //console.log('Administrador');
                                                                                    let dtipod = new DiscenteTipoDiscenteDao(req.connection);
                                                                                   dtipod.inserirDiscenteTipoDiscente(id_tipo_discente, discente.id_discente, date_certa, (error, tipo_d_result) => {
                                                                                        if(error){
                                                                                            reject(error);
                                                                                        }else{
                                                                                            resolve(tipo_d_result);
                                                                                        }
                                                                                    });
                                                                        })).then(result => {
                                                                            //console.log(result); console.log('aq');
                                                                            console.log('cad ok');
                                                                            res.status(200).json({resultado: result, erro: null});
                                                                    
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
                                            }).catch(error => {
                                                next(error);
                                            });
                                       // }
                                    }
                                });
                            //}
                        }
                    });
                }else{
                    var responseJSON = new Object();
                    var erro_lista = [];
                    var erro = new Object();
                    erro.param = "email";
                    erro.msg = 'Este e-mail já está cadastrado.';
                    erro_lista.push(erro);
                    responseJSON.erro = erro_lista;

                    return res.status(400).json({resultado: null, erro : erro_lista});
                    //return res.status(500).json({resultado: null, erro: "Este e-mail já possui cadastro!"});
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
    
    //if(id_tipo_usuario == config.tipo_usuario.admin || id_tipo_usuario == config.tipo_usuario.coordenador || id_tipo_usuario == config.tipo_usuario.discente || id_tipo_usuario == config.tipo_usuario.secretaria){
        req.checkParams('id_discente', 'id é obrigatorio ser do tipo int').isInt();
        req.assert('nome', 'nome é obrigatório').notEmpty(); 
        req.assert('data_nascimento', 'data de nascimento é obrigatório').notEmpty();
        req.assert('data_nascimento', 'data de nascimento incorreta').isISO8601();
        req.assert('id_nacionalidade', 'Nacionalidade é obrigatório').notEmpty();
        req.assert('id_sexo', 'Sexo é obrigatório').notEmpty();
        //req.assert('ocupacoes', 'ocupação é obrigatório').isValidoListaOcupacoes();
        
        if(req.body.endereco_id_pais != undefined && req.body.endereco_id_pais != null && parseInt(req.body.endereco_id_pais) == 1){
        if(req.body.cpf != null && req.body.cpf != undefined && req.body.cpf.length > 0 && CPF.isValid(req.body.cpf) != true){
            var responseJSON = new Object();
            var erro_lista = [];
            var erro = new Object();
            erro.param = "cpf";
            erro.msg = 'CPF em formato inválido';
            erro_lista.push(erro);
            responseJSON.erro = erro_lista;
            return res.status(400).json({resultado: null, erro : erro_lista});
        }
    //}
    //else 
    if(req.body.endereco_id_pais != undefined && req.body.endereco_id_pais != null && parseInt(req.body.endereco_id_pais) != 1){
        req.assert('passaporte', 'Passaporte é obrigatório').notEmpty();
    }

        console.log("Editar");
        req.assert('senha', 'senha é obrigatório').notEmpty();
        req.assert('email', 'email é obrigatório').notEmpty();
        req.assert('id_docente', 'docente é obrigatório').notEmpty();
        req.assert('id_titulo', 'titulo é obrigatório').notEmpty();
        req.assert('id_sexo', 'sexo é obrigatório').notEmpty();


        let erros = req.validationErrors();
        if(erros){
            res.status(400).json({resultado: null, erro: erros});
        return;
        }

        console.log("editar 2");

        // dps de passar por isValidoListaOcupacoes, 
        // com JSON.parse abaixo transforma em uma lista de ocupações.
        req.body.ocupacoes = JSON.parse(req.body.ocupacoes);
        
        let cargoDao = new cargoDiscenteDao(req.connection);
        let listaOcupacoes = req.body.ocupacoes;
        let id_cargo_discente = [];
        
        (new Promise(function (resolve, reject) {
            async.each(listaOcupacoes, function (result, callback) {
                console.log("result.cargo: "+result.cargo);
                cargoDao.recuperarCargoDiscentePorNome(result.cargo, (error, result_cargo_discente) => {
                    if (error) {
                        callback(error);
                        //return res.status(500).json({ resultado: null, erro: error });
                    } else {
                        if (result_cargo_discente == null) {
                            (new Promise(function (resolve, reject) {
                                    cargoDao.inserirCargoDiscente(result.cargo, (error, result_cadastro_cargo_discente) => {
                                        if (error) {
                                            reject(error);
                                        } else {
                                            resolve(result_cadastro_cargo_discente);
                                        }
                                    });
                            })).then(result => {
                                //pega id e insere na lista
                                id_cargo_discente.push(result.insertId);
                                callback();

                            }).catch(error => {
                                next(error);
                            })

                        } else {
                            // console.log("id_cargo_discente push: ", result_cargo_discente.id_cargo_discente);
                            id_cargo_discente.push(result_cargo_discente.id_cargo_discente);
                            callback();
                            //res.status(200).json({ resultado: result, erro: null });
                        }
                    }
                })
            }, function(err){
                if(!err){
                    // console.log('FINAL cargoo:  ');
                    resolve(id_cargo_discente);
                }else{
                    reject(err);
                }
            
            }); 
        }).then(result => {
            // resolve(id_cargo_discente);
            let iDao = new instituicaoDao(req.connection);
            let id_instituicao = [];
            (new Promise(function (resolve, reject) {
                // fazer o mesmo para instituição
                async.each(req.body.ocupacoes, function (result, callback) {
                    // console.log("result.id_instituição: "+ result.id_instituicao);
                    iDao.recuperarInstituicaoPorId(result.id_instituicao, (error, result_instituicao) => {
                        if(error){
                            callback(error);
                        }else{
                            if (result_instituicao == null) {
                                (new Promise(function (resolve, reject) {
                                    iDao.inserirInstituicao(result.nome, result.sigla, result.id_tipo_instituicao, (error, result_cadastro_instituicao) => {
                                        if (error) {
                                            reject(error);
                                        } else {
                                            resolve(result_cadastro_instituicao);
                                        }
                                    });
                                })).then(result => {
                                    id_instituicao.push(result.insertId);
                                    callback();
                                }).catch(error => {
                                    next(error);
                                })
                            } else {
                                // console.log("id_id_instituicao push: ", result.id_instituicao);
                                id_instituicao.push(result.id_instituicao);
                                callback();
                                //res.status(200).json({ resultado: result, erro: null });
                            }
                        }
                    })
                }, function(err){
                    if(!err){
                        // console.log('FINAL inst:  ');
                        resolve(id_instituicao);
                    }else{
                        reject(err);
                    }
                
                }); 
                // }).then(result => {
                //     // resolve(id_instituicao);
                //     // insere esses id no discente, e chama editarDiscente
                //     callback();
                // }).catch(error => {
                //     next(error);
                // })
            })).then(result => {
                // resolve(id_instituicao);
                (new Promise(function (resolve, reject) {
    
                    let discenteCIDao = new DiscenteCargoInstituicaoDao(req.connection);
                    let id_discente = parseInt(req.params.id_discente);
                    let lista_inst_carg = [];
                    // console.log("lista i: ", id_instituicao);
                    // console.log("lista c: ", id_cargo_discente);
            
                    for(var j = 0; j < id_instituicao.length; j++){
                        
                        var obj = new Object();
                        obj.inst = id_instituicao[j];
                        obj.carg = id_cargo_discente[j];
                        lista_inst_carg.push(obj);
                    }
                   
                    //(new Promise(function(resolve,reject){
                        async.each(lista_inst_carg, function(result, callback){
                            // console.log("result.inst ", result.inst);
                            // console.log("parse int parseInt(result.inst) ", parseInt(result.inst));
                            discenteCIDao.recuperarCargoDiscentePorIds(id_discente, parseInt(result.inst), result.carg, (error, result_disc_inst)=> {
                                if(error){
                                    // console.log('ERRO cargo inst');
                                    callback(error);
                                }else{
                                    // console.log('cadastrou cargo inst');
                                    // //resolve(result_disc_inst);
                                    // callback();
                                    if (result_disc_inst == null) {
                                        (new Promise(function(resolve,reject){
                                            discenteCIDao.inserirDiscenteCargoInstituicao(id_discente, parseInt(result.inst), result.carg, (error, result_cadastro_cdi) => {
                                                if (error) {
                                                    reject(error);
                                                } else {
                                                    resolve(result_cadastro_cdi);
                                                }
                                            });
                                        })).then(result => {
                                            // id_instituicao.push(result.insertId);
                                            callback();
                                        }).catch(error => {
                                            next(error);
                                        })
                                    } else {
                                        callback();
                                    }
                                }
                            })
                        }, function(err){
                            if(!err){
                                // console.log('FINAL cargo inst  ');
                                // resolve(lista_inst_carg);
                                resolve(true);
                            }else{
                                // console.log('oi cargo inst  ');
                                reject(err);
                            }
                        
                        }); 
        
                })).then(result => {
                    // res.status(200).json({resultado: result, erro: null});
                    // console.log("lista: ", lista_inst_carg);
                    // console.log('oiii');

                    (new Promise(function (resolve, reject) {

                        let discente = new Discente();
                        discente.construtorParametrosRequisicao(req.body);
                        console.log('req body ', req.body);

                        console.log('id nacionalidade ', discente.id_nacionalidade);
        
                        let disc = new DiscenteDao(req.connection);
                        console.log('discente ', discente);

                        disc.editarDiscente(discente, (error, discente_result) => {
                            if(error){
                                console.log('ERRO Editar discente: ' + error);
                                reject(error);
                            }else{
                                console.log('Editou discente');
                                resolve(discente_result);
                            }
                        })
                    })).then(result => {
                        res.status(200).json({ resultado: result, erro: null });
                    }).catch(error => {
                        next(error);
                    })
                }).catch(error => {
                    next(error);
                })
    
            }).catch(error => {
                next(error);
            })

        }).catch(error => {
            next(error);
        }))

    } else  res.status(401).json({resultado: null, erro: erros_mensagem.erro_usuario_permissao});
  }

  exports.excluirDiscenteLogico = (req, res, next) => {
    //let id_tipo_usuario = req.id_tipo_usuario;

    let id_tipo_usuario = 1;

    if(id_tipo_usuario == config.tipo_usuario.admin || id_tipo_usuario == config.tipo_usuario.coordenador || id_tipo_usuario == config.tipo_usuario.secretaria){
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
                disc.excluirDiscenteLogico(id_discente, (error, discente_result) => {
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

  exports.excluirDiscente = (req, res, next) => {
    //let id_tipo_usuario = req.id_tipo_usuario;

    let id_tipo_usuario = 1;

    if(id_tipo_usuario == config.tipo_usuario.admin || id_tipo_usuario == config.tipo_usuario.coordenador || id_tipo_usuario == config.tipo_usuario.secretaria){
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
                let disc = new DiscenteTipoDiscenteDao(req.connection);
                disc.excluirDiscenteTipoDiscente(id_discente, (error, discente_result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(discente_result);
                    }
                });
        })).then(result => {
            //res.status(200).json({resultado: true, erro: null});

            (new Promise(
                function (resolve, reject) {
                        let disc = new DiscenteCargoInstituicaoDao(req.connection);
                        disc.excluirDiscenteCargoInstituicao(id_discente, (error, discente_result) => {
                            if(error){
                                reject(error);
                            }else{
                                resolve(discente_result);
                            }
                        });
                })).then(result => {
                    //res.status(200).json({resultado: true, erro: null});
        
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
                    
                }).catch(error => {
                    next(error);
                });

        }).catch(error => {
            next(error);
        });
    }
    else  res.status(401).json({resultado: null, erro: erros_mensagem.erro_usuario_permissao});
  
  }

//----INDICADORES DISCENTE----//
  
  exports.RecuperarDiscenteInstituicao = (req, res, next) => {
    
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao);

    var object = [];      
    var total_instituicao = {};

    var instituicoes = {};
    var total = {};
    
        (new Promise(
        function (resolve, reject) {
                let inst = new instituicaoDao(req.connection);
                let disc = new DiscenteDao(req.connection);
                inst.recuperarInstituicoes((error, instituicao_result) => {
                    if(error){
                        reject(error);
                    }else{
                        console.log('Instituicoes: ', instituicao_result);
                        async.each(instituicao_result, function(result, callback){ 

                            disc.buscarDiscenteInstituicao(result.id_instituicao, id_situacao, (error, result_inst_discente)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Result: ', result.id_instituicao, result_inst_discente);
                                    instituicoes = {
                                        instituicao : {
                                            idInstitucao: result.id_instituicao,
                                            nome: result.nome,
                                            sigla: result.sigla,
                                            id_tipo_instituicao: result.id_tipo_instituicao 
                                        },
                                        total : result_inst_discente[0]['count(discente.id_discente)']
                                    }
                                    total_instituicao = {
                                        total_instituicao : instituicoes,
                                    }
                                    object.push(total_instituicao); 
                                    callback();
                                }
                            });      

                        }, function(err){
                            if(!err){
                                console.log('ok');
                                resolve(object);
                            }else{
                                reject(err);
                            }
                        
                        });            
                        //resolve(instituicao_result);
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
  }



  exports.RecuperarDiscenteCargoInstituicao = (req, res, next) => {
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao);

    var object = [];      
    var total_cargo_discente = {};

    var cargo_discente = {};
    var total = {};
    
        (new Promise(
        function (resolve, reject) {
                let cargo = new cargoDiscenteDao(req.connection);
                let disc= new DiscenteDao(req.connection);
                cargo.recuperarCargosDiscente((error, cargo_result) => {
                    if(error){
                        reject(error);
                    }else{
                        console.log('Instituicoes Cargos: ', cargo_result);
                        async.each(cargo_result, function(result, callback){ 

                            disc.buscarCargoDiscente(result.id_cargo_discente, id_situacao, (error, result_cargo_discente)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Result: ', result.id_cargo_discente, result_cargo_discente);
                                    cargo_discente = {
                                        cargo_discente : {
                                            idCargo: result.id_cargo_discente,
                                            nome: result.nome,
                                            
                                        },
                                        total : result_cargo_discente[0]['count(discente.id_discente)']
                                    }
                                    total_cargo_discente = {
                                        total_cargo_discente : cargo_discente,
                                    }
                                    object.push(total_cargo_discente); 
                                    callback();
                                }
                            });      

                        }, function(err){
                            if(!err){
                                console.log('ok');
                                resolve(object);
                            }else{
                                reject(err);
                            }
                        
                        });            
                        //resolve(instituicao_result);
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
  }


  exports.RecuperarNacionalidadeDiscente = (req, res, next) => {
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao);

    var object = [];      
    var total_pais_discente = {};

    var pais_discente = {};
    var total = {};
    
        (new Promise(
        function (resolve, reject) {
                let pais = new paisDao(req.connection);
                let disc = new DiscenteDao(req.connection);
                pais.recuperarPaises((error, pais_result) => {
                    if(error){
                        reject(error);
                    }else{
                        console.log('Paises: ', pais_result);
                        async.each(pais_result, function(result, callback){ 

                            disc.buscarPaisesDiscente(result.id_pais, id_situacao, (error, result_pais_discente)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Result: ', result.id_pais, result_pais_discente);
                                    pais_discente = {
                                        pais_discente : {
                                            idPais: result.id_pais,
                                            nome: result.nome,
                                            nacionalidade: result.nacionalidade
                                            
                                        },
                                        total : result_pais_discente[0]['count(discente.id_discente)']
                                    }
                                    total_pais_discente = {
                                        total_pais_discente : pais_discente,
                                    }
                                    object.push(total_pais_discente); 
                                    callback();
                                }
                            });      

                        }, function(err){
                            if(!err){
                                console.log('ok');
                                resolve(object);
                            }else{
                                reject(err);
                            }
                        
                        });            
                        //resolve(instituicao_result);
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
  }


  exports.RecuperarTipoInstituicaoDiscente = (req, res, next) => {

    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao);

    var object = [];      
    var total_tipo_instituicao_discente = {};

    var tipo_instituicao_discente = {};
    var total = {};

    var tipo_instituicao = [];
    tipo_instituicao[0] = config.tipo_instituicao.privada;
    tipo_instituicao[1] = config.tipo_instituicao.publica;

    console.log('Tipo instituicao: ', tipo_instituicao);
    let disc = new DiscenteDao(req.connection);

    (new Promise(
        function (resolve, reject) {
        async.each(tipo_instituicao, function(result, callback){ 

            disc.buscarTipoInstituicaoDiscente(result.id, id_situacao, (error, result_tipo_inst_discente)=> {
                if(error){
                    reject(error);
                }else{
                    console.log('Result: ', result.id, result_tipo_inst_discente);
                    tipo_instituicao_discente = {
                        tipo_instituicao_discente : {
                            idTipoInstituicao: result.id,
                            nome: result.nome,   
                        },
                        total : result_tipo_inst_discente[0]['count(discente.id_discente)']
                    }
                    total_tipo_instituicao_discente = {
                        total_tipo_instituicao_discente : tipo_instituicao_discente,
                    }
                    object.push(total_tipo_instituicao_discente); 
                    callback();
                }
            });      

        }, function(err){
            if(!err){
                console.log('ok');
                resolve(object);
            }else{
                reject(err);
            }
        
        });            
    //resolve(instituicao_result);
    })).then(result => {
        res.status(200).json({resultado: result, erro: null});
    }).catch(error => {
        next(error);
    });
  }


  exports.RecuperarTituloDiscente = (req, res, next) => {
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao);

    var object = [];      
    var total_titulo_discente = {};

    var titulo_discente = {};
    var total = {};
    
        (new Promise(
        function (resolve, reject) {
                let titulo = new tituloDao(req.connection);
                let disc = new DiscenteDao(req.connection);
                titulo.recuperarTitulos((error, titulo_result) => {
                    if(error){
                        reject(error);
                    }else{
                        console.log('Titulos: ', titulo_result);
                        async.each(titulo_result, function(result, callback){ 

                            disc.buscarTituloDiscente(result.id_titulo, id_situacao, (error, result_titulo_discente)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Result: ', result.id_titulo, result_titulo_discente);
                                    titulo_discente = {
                                        titulo_discente : {
                                            idTitulo: result.id_titulo,
                                            nome: result.nome
                                           
                                        },
                                        total : result_titulo_discente[0]['count(discente.id_discente)']
                                    }
                                    total_titulo_discente = {
                                        total_titulo_discente : titulo_discente,
                                    }
                                    object.push(total_titulo_discente); 
                                    callback();
                                }
                            });      

                        }, function(err){
                            if(!err){
                                console.log('ok');
                                resolve(object);
                            }else{
                                reject(err);
                            }
                        });            
                        //resolve(instituicao_result);
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
  }


  exports.RecuperarTipoDiscente = (req, res, next) => {
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao);

    var object = [];      
    var total_tipo_discente = {};

    var tipos_discente = {};
    var total = {};
    
        (new Promise(
        function (resolve, reject) {
                let tipo_disc = new tipoDiscenteDao(req.connection);
                let disc = new DiscenteDao(req.connection);
                tipo_disc.recuperarTiposDiscente((error, tipo_disc_result) => {
                    if(error){
                        reject(error);
                    }else{
                        console.log('Tipos Discentes: ', tipo_disc_result);
                        async.each(tipo_disc_result, function(result, callback){ 

                            disc.buscarTipoDiscente(result.id_tipo_discente, id_situacao, (error, result_tipo_discente)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Result: ', result.id_tipo_discente, result_tipo_discente);
                                    tipos_discente = {
                                        tipo_discente : {
                                            idTipoDiscente: result.id_tipo_discente,
                                            nome: result.nome,
                                            
                                        },
                                        total : result_tipo_discente[0]['count(discente.id_discente)']
                                    }
                                    total_tipo_discente = {
                                        total_tipo_discente : tipos_discente,
                                    }
                                    object.push(total_tipo_discente); 
                                    callback();
                                }
                            });      

                        }, function(err){
                            if(!err){
                                console.log('ok');
                                resolve(object);
                            }else{
                                reject(err);
                            }
                        
                        });            
                        //resolve(instituicao_result);
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
        }).catch(error => {
            next(error);
        });
  }


  exports.RecuperarDiscentePorTipoDiscente = (req, res, next) => {

    req.assert('id_tipo_discente', 'id é obrigatório').notEmpty();
    req.assert('id_tipo_discente', 'id é obrigatório ser do tipo int').isInt();
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_tipo_discente = parseInt(req.params.id_tipo_discente); 
    let id_situacao = parseInt(req.params.id_situacao);
    
    var object = [];      
    var discente_tipo_discente = {};

    var total = {};

    (new Promise(
        function (resolve, reject) {
               
                let disc = new DiscenteDao(req.connection);
                disc.buscarIdDiscentePorTipoDiscente(id_tipo_discente, id_situacao, (error, disc_result) => { //retorna lista de ids dos discentes
                    if(error){
                        reject(error);
                    }else{
                        console.log('Tipos Discentes: ', disc_result);
                        async.each(disc_result, function(result, callback){ 

                            disc.recuperarDiscenteConformeTipoDiscente(result.id_discente, id_tipo_discente,(error, result_tipo_discente)=> {
                                if(error){
                                    reject(error);
                                }else{
                                    console.log('Result: ', result.id_discente, result_tipo_discente);
                                   discente_tipo_discente = {
                                        discente : {
                                            idDiscente: result.id_discente,
                                            nome: result_tipo_discente[0].nome,
                                            sobrenome: result_tipo_discente[0].sobrenome,
                                            email: result_tipo_discente[0].email,
                                            id_docente: result_tipo_discente[0].id_docente,
                                            id_titulo: result_tipo_discente[0].id_titulo,
                                            link_lattes: result_tipo_discente[0].link_lattes,
                                            situacao: result_tipo_discente[0].situacao,
                                            sexo: result_tipo_discente[0].sexo   
                                        },
                                        tipo_discente : {
                                            idTipoDiscente: result_tipo_discente[0].id_tipo_discente,
                                            nome: result_tipo_discente[0].nome_tipo_discente,
                                            data_inicial: result_tipo_discente[0].data_inicial,
                                            data_final: result_tipo_discente[0].data_final
                                        }
                                    }
                                    
                                    total = {
                                       discente_tipo_discente
                                    }

                                    object.push(total); 
                                    callback();
                                }
                            });      

                        }, function(err){
                            if(!err){
                                console.log('ok');
                                resolve(object);
                            }else{
                                reject(err);
                            }
                        
                        });            
                    }
                });
        })).then(result => {
            res.status(200).json({resultado: result, erro: null});
                        //resolve(instituicao_result);
        }).catch(error => {
            next(error);
        });
  }


  //situacao 1 : ativo
  //2 : inativo
  //3 : egresso
  exports.RecuperarDiscentePorSituacao = (req, res, next) => {

    req.assert('id_situacao', 'id é obrigatório').notEmpty();
    req.assert('id_situacao', 'id é obrigatório ser do tipo int').isInt();

    let erros = req.validationErrors();
    if(erros){
        res.status(400).json({resultado: null, erro: erros});
    return;
    }

    let id_situacao = parseInt(req.params.id_situacao); 
    
    (new Promise(
        function (resolve, reject) {
               
            let disc = new DiscenteDao(req.connection);
            disc.buscarDiscentePorSituacao(id_situacao, (error, disc_result) => {
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


  exports.RecuperarQuantidadeDiscentePorSituacao = (req, res, next) => {

    let situacao = [];
    situacao = [
        {
            id: config.situacao_discente.ativo,
            nome: "ativo"
        },
        {
            id: config.situacao_discente.inativo,
            nome: "inativo"
        },
        {
            id:config.situacao_discente.egresso,
            nome: "egresso"
        }
    ]
    

    console.log('situacao: ', situacao);

    var object = [];      
    var quantidade_situacao = {};
    var total_quantidade_situacao = {};

    async.each(situacao, function(result, callback){         
        let disc = new DiscenteDao(req.connection);
        disc.buscarQuantidadeDiscentePorSituacao(result.id, (error, total_result) => {
            if(error){
                console.log(error);
                callback(error);
            }else{
                console.log('Total result: ', total_result); 
                quantidade_situacao = {
                    situacao : {
                        id_situacao: result.id,
                        nome: result.nome
                    },
                    total : total_result[0]['count(id_discente)']
                }

                total_quantidade_situacao = {
                    quantidade_situacao
                }
                console.log('total: ', total_quantidade_situacao);
                object.push(total_quantidade_situacao); 
                callback();
            }
        });      
                        
    }, function(err){
        if(!err){
            console.log('ok');
            res.status(200).json({resultado: object, erro: null});
        }else{
            next(err);
        }
    
    });            
  }





