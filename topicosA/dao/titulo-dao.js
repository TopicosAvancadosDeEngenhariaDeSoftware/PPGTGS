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
}