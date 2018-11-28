'use strict'
var mysql = require('mysql');  

module.exports = class InstituicaoDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarInstituicaoPorId(id_instituicao, callback){
        var sql = "select * from instituicao where id_instituicao = ?;"
        var params = [];
        params.push(id_instituicao);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                callback(null, results[0] ? results[0] : null);
            }
        });
    }

    recuperarInstituicoes(callback){
        var sql = "select * from instituicao;"
        var params = [];
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results != null ? results : null);
            }
        });
    }

    inserirInstituicao(nome, sigla, id_tipo_instituicao, callback){
        console.log('nome: ', nome);
        console.log('sigla: ', sigla),
        console.log('tipo inst: ', id_tipo_instituicao);

        var sql = "insert into instituicao (nome, sigla, id_tipo_instituicao) values (?,?,?);"
        var params = [];
        params.push(nome);
        params.push(sigla);
        params.push(id_tipo_instituicao);
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            //console.log('Tentou inserir:',results);
            if(error){
                callback(error, null);
            }else{
                callback(null, results);
            }
            
        });
    }

    editarInstituicao(id_instituicao, nome, sigla, id_tipo_instituicao, callback){
        var sql = "update instituicao set nome = ?, sigla = ?, id_tipo_instituicao = ? where id_instituicao = ?;"
        var params = [];
        params.push(nome);
        params.push(sigla);
        params.push(id_tipo_instituicao);
        params.push(id_instituicao);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirInstituicao(id_instituicao, callback){
        var sql = "delete from instituicao where id_instituicao = ? ;"
        var params = [];
        params.push(id_instituicao);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    } 

   
}