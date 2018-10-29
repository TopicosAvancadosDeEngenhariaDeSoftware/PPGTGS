var mysql = require('mysql');  

module.exports = class DoscenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarDocentesSomenteNome(callback){
        var sql = "SELECT id_docente, nome, sobrenome FROM Docente;"
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