var mysql = require('mysql');  

module.exports = class DocenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarDocentesSomenteNome(callback){
        var sql = "select id_docente, nome, sobrenome from docente;"
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

    recuperarDocenteId(id_docente,callback){
        var sql = "select nome from docente where id_docente = ?;"
        var params = [];
        params.push(id_docente);
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