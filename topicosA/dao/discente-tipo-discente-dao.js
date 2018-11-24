var mysql = require('mysql');  

module.exports = class DiscenteTipoDiscenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarDiscenteTiposDiscente(callback){
        var sql = "SELECT * FROM DiscenteTipoDiscente;"
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

    recuperarDiscenteTipoDiscentePorIdDiscente(id_discente, callback){
        var sql = "SELECT * FROM DiscenteTipoDiscente where id_discente = ?;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results ? results : null);
            }
        });
    }
}