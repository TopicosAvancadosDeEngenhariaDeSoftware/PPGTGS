var mysql = require('mysql');  

module.exports = class PaisDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarPaises(callback){
        var sql = "select * from pais;"
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

    recuperarPaisId(id_pais, callback){
        var sql = "select * from pais where id_pais = ?;"
        var params = [];
        params.push(id_pais);
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