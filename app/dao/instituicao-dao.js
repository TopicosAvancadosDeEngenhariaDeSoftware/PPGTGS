'use strict'
var mysql = require('mysql');  

module.exports = class InstituicaoDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarInstituicaoPorId(id_instituicao, callback){
        var sql = "SELECT * FROM Instituicao WHERE id_instituicao = ?;"
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
        var sql = "SELECT * FROM Instituicao;"
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

        var sql = "INSERT INTO Instituicao (nome, sigla, id_tipo_instituicao) VALUES (?,?,?);"
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
        var sql = "UPDATE Instituicao SET nome = ?, sigla = ?, id_tipo_instituicao = ? WHERE id_instituicao = ?;"
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
        var sql = "DELETE FROM Instituicao WHERE id_instituicao = ? ;"
        var params = [];
        params.push(id_instituicao);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    } 

   
}