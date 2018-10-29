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





                                                                    





    