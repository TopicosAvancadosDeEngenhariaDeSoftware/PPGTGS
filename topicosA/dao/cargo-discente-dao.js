'use strict'
var mysql = require('mysql');  

module.exports = class CargoDiscenteDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarCargoDiscentePorId(id_cargo_discente, callback){
        var sql = "SELECT * FROM CargoDiscente WHERE id_cargo_discente = ?;"
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
        var sql = "SELECT * FROM CargoDiscente WHERE nome = ?;"
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
        var sql = "SELECT * FROM CargoDiscente;"
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

        var sql = "INSERT INTO CargoDiscente (nome) VALUES (?);"
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
        var sql = "UPDATE CargoDiscente SET nome = ? WHERE id_cargo_discente = ?;"
        var params = [];
        params.push(nome);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirCargoDiscente(id_cargo_discente, callback){
        var sql = "DELETE FROM CargoDiscente WHERE id_cargo_discente = ? ;"
        var params = [];
        params.push(id_cargo_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    } 

   
}