var mysql = require('mysql');  

module.exports = class EstadoDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarEstadosPorPais(id_pais, callback){
        var sql = "select * from estado where id_pais = ?;"
        var params = [];
        params.push(id_pais);
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