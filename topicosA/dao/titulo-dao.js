var mysql = require('mysql');  

module.exports = class TituloDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarTitulos(callback){
        var sql = "SELECT * FROM Titulo;"
        var params = [];
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results);
            }
        });
    }

    recuperarTituloId(id_titulo,callback){
        var sql = "SELECT * FROM Titulo where id_titulo = ?;"
        var params = [];
        params.push(id_titulo);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
        });
    }
}