var mysql = require('mysql');  

module.exports = class TipoDiscenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarTiposDiscente(callback){
        var sql = "SELECT * FROM TipoDiscente;"
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
}