'use strict'
var mysql = require('mysql');  

module.exports = class EnderecoDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarEnderecoPorId(id_endereco, callback){
        var sql = "SELECT * FROM Endereco WHERE id_endereco = ?;"
        var params = [];
        params.push(id_bairro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                
                callback(error,results);
            }
        });
    }
    recuperarEnderecosPorLogradouro(id_logradouro, callback){
        var sql = "SELECT * FROM Endereco WHERE id_logradouro = ?;"
        var params = [];
        params.push(id_logradouro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                
                callback(error,results);
            }
        });
    }
    recuperarEnderecoPorBairro(id_bairro, callback){
        var sql = "SELECT * FROM Endereco WHERE id_bairro = ?;"
        var params = [];
        params.push(id_bairro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                
                callback(error,results);
            }
        });
    }
    recuperarEnderecosPorCidade(id_cidade, callback){
        var sql = "SELECT * FROM Endereco WHERE id_cidade = ?;"
        var params = [];
        params.push(id_bairro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                
                callback(error,results);
            }
        });
    }
    recuperarEnderecosPorCep(cep, callback){
        var sql = "SELECT * FROM Endereco WHERE cep = ? ;"
        var params = [];
        params.push(cep);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    }
    inserirEndereco(endereco,callback){

        var sql = "INSERT INTO Endereco (id_cidade,id_bairro,id_logradouro,cep) VALUES (?,?,?,?);"
        var params = [];
        params.push(endereco.id_cidade);
        params.push(endereco.id_bairro);
        params.push(endereco.id_logradouro);
        params.push(endereco.cep)
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            console.log('Tentou inserir:',results);
            if(error){
                callback(error, null);
            }else{
                callback(null, results);
            }
        });
    }

    editarEndereco(id_cidade,id_bairro,id_logradouro,cep,id_endereco, callback){
        var sql = "UPDATE Endereco SET id_cidade = ?, id_bairro = ?,id_logradouro = ?, cep = ? WHERE id_endereco = ?;"
        var params = [];
        params.push(id_cidade);
        params.push(id_bairro);
        params.push(id_logradouro);
        params.push(cep);
        params.push(id_endereco);
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirEndereco(id_endereco, callback){
        var sql = "DELETE FROM Endereco WHERE id_endereco = ? ;"
        var params = [];
        params.push(id_endereco);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    }
}