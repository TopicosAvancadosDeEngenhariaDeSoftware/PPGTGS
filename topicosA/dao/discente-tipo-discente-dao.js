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

    inserirDiscenteTipoDiscente(id_tipo_discente, id_discente, data_inicial, callback){

        var sql = "INSERT INTO DiscenteTipoDiscente (id_tipo_discente, id_discente, data_inicial, isAtual) VALUES (?,?,?,?);"
        var params = [];
        params.push(id_tipo_discente);
        params.push(id_discente);
        params.push(data_inicial);
        params.push(true);

        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                callback(error,true ? true : null);
            }
        });
    }

}