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

    
    //retornar alguns dados do aluno e do discenteTipoDiscente
    buscarTipoDiscenteId(id_tipo_discente,callback){
        var sql = "SELECT * FROM TipoDiscente WHERE id_tipo_discente = ?"
        var params = [];
        params.push(id_tipo_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            callback(error, results);

        });
}

}