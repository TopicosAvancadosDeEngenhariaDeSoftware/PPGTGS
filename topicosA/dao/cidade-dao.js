var mysql = require('mysql');  

module.exports = class CidadeDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarCidadesPorEstado(id_estado, callback){
        var sql = "select * from cidade where id_estado = ?;"
        var params = [];
        params.push(id_estado);
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