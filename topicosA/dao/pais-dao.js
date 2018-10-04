var mysql = require('mysql');  

module.exports = class PaisDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarPaises(callback){
        var sql = "SELECT * FROM Pais;"
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