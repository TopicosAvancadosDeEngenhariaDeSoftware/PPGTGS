var mysql = require('mysql');  

module.exports = class LogradouroDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarLogradouroPorId(id_logradouro, callback){
        var sql = "SELECT * FROM Logradouro WHERE id_logradouro = ?;"
        var params = [];
        params.push(id_logradouro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                console.log('results logradouro', results);
                callback(error,results);
            }
        });
    }

    recuperarLogradouroPorNome(nome, callback){
        var sql = "SELECT * FROM Logradouro WHERE nome = ? ;"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                console.log('results logradouro', results[0]);
                callback(error,results[0] != null ? results[0] : null);
            }
        });
    }

    inserirLogradouro(nome, callback){

        var sql = "INSERT INTO Logradouro (nome) VALUES (?);"
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

    editarLogradouro(id_logradouro,nome, callback){
        var sql = "UPDATE Logradouro SET nome = ? WHERE id_logradouro = ?;"
        var params = [];
        params.push(nome);
        params.push(id_logradouro);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, results);
        });
    }

    excluirLogradouro(id_logradouro, callback){
        var sql = "DELETE FROM Logradouro WHERE id_logradouro = ? ;"
        var params = [];
        params.push(id_logradouro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    }

   
}