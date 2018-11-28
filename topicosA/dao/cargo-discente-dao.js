'use strict'
var mysql = require('mysql');  

module.exports = class CargoDiscenteDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarCargoDiscentePorId(id_cargo_discente, callback){
        var sql = "select * from cargodiscente where id_cargo_discente = ?;"
        var params = [];
        params.push(id_cargo_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                callback(null, results[0] ? results[0] : null);
            }
        });
    }

    recuperarCargoDiscentePorNome(nome, callback){
        var sql = "select * from cargodiscente where nome = ?;"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                callback(null, results[0] ? results[0] : null);
            }
        });
    }

    recuperarCargosDiscente(callback){
        var sql = "select * from cargodiscente;"
        var params = [];
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            //console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results != null ? results : null);
            }
        });
    }

    inserirCargoDiscente(nome, callback){

        var sql = "insert into cargodiscente (nome) values (?);"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('Tentou inserir:',results);
            if(error){
                callback(error, null);
            }else{
                callback(null, results);
            }
            
        });
    }

    editarCargosDiscente(id_cargo_discente, callback){
        var sql = "update cargodiscente set nome = ? where id_cargo_discente = ?;"
        var params = [];
        params.push(nome);
        params.push(id_cargo_discente);
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirCargoDiscente(id_cargo_discente, callback){
        var sql = "delete from cargodiscente where id_cargo_discente = ? ;"
        var params = [];
        params.push(id_cargo_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    } 

   
}