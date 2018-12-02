var mysql = require('mysql');  

module.exports = class DiscenteTipoDiscenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarDiscenteTiposDiscente(callback){
        var sql = "select * from discentetipodiscente;"
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
        var sql = "select * from discentetipodiscente where id_discente = ? and isatual = ?;"
        var params = [];
        params.push(id_discente);
        params.push(true);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results ? results : null);
            }
        });
    }

    recuperarDiscenteTipoDiscentePorIds(id_discente, id_tipo_discente, callback){
        var sql = "select * from discentetipodiscente where id_discente = ? and id_tipo_discente = ?;"
        var params = [];
        params.push(id_discente);
        params.push(id_tipo_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results ? results : null);
            }
        });
    }

    alterarIsAtualFalseDiscenteTipoDiscente(id_discente, id_tipo_discente, callback){
        var sql = "update discentetipodiscente set isatual = ? where id_discente = ? and id_tipo_discente = ?;"
        var params = [];
        params.push(false);
        params.push(id_discente);
        params.push(id_tipo_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{

            if(error){
                callback(error, null);
            }else{
                callback(error,results ? results : null);
            }
        });
    }

    alterarIsAtualTrueDiscenteTipoDiscente(id_discente, id_tipo_discente, callback){
        var sql = "update discentetipodiscente set isatual = ? where id_discente = ? and id_tipo_discente = ?;"
        var params = [];
        params.push(true);
        params.push(id_discente);
        params.push(id_tipo_discente);
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

        var sql = "insert into discentetipodiscente (id_tipo_discente, id_discente, data_inicial, isatual) values (?,?,?,?);"
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



    excluirDiscenteTipoDiscente(id_discente, callback){ //exclusão lógica
        var sql = "delete from discentetipodiscente where id_discente = ?;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            if(error){
                callback(error, null);
            }else{
                callback(null, true ? true : null);
            }
    
        });
    }

}