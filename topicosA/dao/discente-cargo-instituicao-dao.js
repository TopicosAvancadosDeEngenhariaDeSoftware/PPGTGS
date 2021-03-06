'use strict'
var mysql = require('mysql');  

module.exports = class DiscenteCargoInstituicaoDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperaroDiscenteCargoInstituicaoPorIdDiscente(id_discente, callback){
        var sql = "select * from discentecargoinstituicao where id_discente = ?;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                callback(null, results ? results : null);
            }
        });
    }

    recuperarDiscenteCargosInstituicao(callback){
        var sql = "select * from discentecargoinstituicao;"
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

    recuperarCargoDiscentePorIds(id_discente, id_instituicao, id_cargo_discente, callback){
        var sql = "select * from discentecargoinstituicao where id_discente = ? and id_instituicao = ? and id_cargo_discente = ?;"
        var params = [];
        params.push(id_discente);
        params.push(id_instituicao);
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

    inserirDiscenteCargoInstituicao(id_discente, id_instituicao, id_cargo_discente, callback){
        //console.log('id disc: ', id_discente);
        //console.log('is instituicao: ', id_instituicao);
        //console.log('id cargo_disc: ', id_cargo_discente);

        var sql = "insert into discentecargoinstituicao (id_discente, id_instituicao, id_cargo_discente) values (?,?,?);"
        var params = [];
        params.push(id_discente);
        params.push(id_instituicao);
        params.push(id_cargo_discente);
        sql = mysql.format(sql, params);
        //console.log(sql);
        this._connection.query(sql, (error, results) =>{
            //console.log('Tentou inserir:',results);
            if(error){
                callback(error, null);
            }else{
                callback(null,results ? results : null);
            }
            
        });
    }

    editarDiscenteCargoInstituicaoPorIdDiscente(id_discente, id_instituicao, id_cargo_discente, callback){
        var sql = "update discentecargoinstituicao set id_discente = ?, id_instituicao = ?, id_cargo_discente = ? where id_discente = ?;"
        var params = [];
        params.push(id_discente);
        params.push(id_instituicao);
        params.push(id_cargo_discente);
        params.push(id_discente);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirDiscenteCargoInstituicao(id_discente, callback){
        var sql = "delete from discentecargoinstituicao where id_discente = ? ;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    } 

    excluirDiscenteCargoInstituicao(id_discente, id_instituicao, id_cargo, callback){
        console.log("ALOOO");
        var sql = "delete from discentecargoinstituicao where id_discente = ? and id_instituicao = ? and id_cargo_discente = ?;"
        var params = [];
        params.push(id_discente);
        params.push(id_instituicao);
        params.push(id_cargo);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    } 

   
}