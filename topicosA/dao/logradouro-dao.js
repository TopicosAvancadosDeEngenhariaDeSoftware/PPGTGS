var mysql = require('mysql');  

module.exports = class LogradouroDao{
    constructor(connection){
        this._connection = connection;
    }
    recuperarLogradouroPorId(id_logradouro, callback){
        var sql = "select * from logradouro where id_logradouro = ?;"
        var params = [];
        params.push(id_logradouro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                console.log('results logradouro', results);
                callback(null,results[0] ? results[0] : null);
            }
        });
    }

    recuperarLogradouroPorNome(nome, callback){
        var sql = "select * from logradouro where nome = ? ;"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                //console.log('results logradouro', results[0]);
                callback(error,results[0] != null ? results[0] : null);
            }
        });
    }

    inserirLogradouro(nome, callback){

        var sql = "insert into logradouro (nome) values (?);"
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
        var sql = "update logradouro set nome = ? where id_logradouro = ?;"
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
        var sql = "delete from logradouro where id_logradouro = ? ;"
        var params = [];
        params.push(id_logradouro);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);
        });
    }

   
}