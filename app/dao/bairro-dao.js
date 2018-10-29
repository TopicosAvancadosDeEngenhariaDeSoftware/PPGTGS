
var mysql = require('mysql');  

module.exports = class BairroDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarBairroPorId(id_bairro, callback){
        var sql = "SELECT * FROM Bairro WHERE id_bairro = ?;"
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
        
    recuperarBairroPorNome(nome, callback){
        var sql = "SELECT * FROM Bairro WHERE nome = ? ;"
        var params = [];
        params.push(nome);
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

    inserirBairro(nome, callback){
        var sql = "INSERT INTO Bairro (nome) VALUES (?);"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('Tentou inserir:',results);
            if(error){
                callback(error, null);
            }else{
                callback(error, results);
            }
        });
    }

    editarBairro(id_bairro,nome, callback){
        var sql = "UPDATE Bairro SET nome = ? WHERE id_bairro = ?;"
        var params = [];
        params.push(nome);
        params.push(id_bairro);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirBairro(id_bairro, callback){
        var sql = "DELETE FROM Bairro WHERE id_bairro = ? ;"
        var params = [];
        params.push(id_bairro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    }

    
}