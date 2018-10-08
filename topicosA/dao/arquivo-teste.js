'use-strict'

const instituicao = require('./instituicao-dao');
const CargoDiscente = require('./cargo-discente-dao');
const DiscenteCargoInstituicao = require('./discente-cargo-instituicao-dao');
const pool = require('../bd/pool-factory');

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err);
        return;
    }
    let inst = new instituicao(connection);
    let c = new CargoDiscente(connection);
    let dc = new DiscenteCargoInstituicao(connection);

    dc.editarDiscenteCargoInstituicaoPorIdDiscente(1,1,1,(error, result) => {
        if(error){
            console.log(error);
        }else{
            console.log(result);
        }
        connection.release();
    });
    
});





                                                                    
(new Promise(function(resolve,reject){  
    async.each(lista_inst_carg, function(result, callback){ 

        (new Promise(function(resolve,reject){  

            verifica_discente_cargo_instituicao.inserirDiscenteCargoInstituicao(id_discente_cadastrado, result.inst, result.carg, (error, result_disc_cargo)=> {
                if(error){
                    reject(error);
                }else{
                    console.log('cadastrou');
                    callback();
                }
            });

        })).then(result => {
            resolve(result_disc_cargo);
        }).catch(error => {
            next(error);   
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
    




    