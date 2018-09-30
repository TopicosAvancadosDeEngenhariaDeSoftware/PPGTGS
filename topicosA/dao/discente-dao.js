const moment = require('moment');
var mysql = require('mysql');  
const Discente = require('../model/Discente');



module.exports = class DiscenteDao{
    constructor(connection){
        this._connection = connection;
    }
    inserirDiscente(discente, callback){

        var sql = "INSERT INTO Discente (nome, data_nascimento, rg, cpf, username, senha, link_lattes, "+
        "email, id_endereco, numero_residencia, complemento) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        var params = [];
        params.push(discente.nome);
        params.push(discente.data_nascimento);
        params.push(discente.rg);
        params.push(discente.cpf);
        params.push(discente.username);
        params.push(discente.senha);
        params.push(discente.link_lattes);
        params.push(discente.email);
        params.push(discente.id_endereco);
        params.push(discente.numero_residencia);
        params.push(discente.complemento);
        params.push(discente.id_docente);
        params.push(discente.isAceito);
        params.push(discente.situacao);
        params.push(discente.email);
        params.push(discente.id_titulo);

        
        sql = mysql.format(sql, params);

        

        this._connection.query(sql, (error, results) =>{
            console.log(results);
            if(error == null) discente.id = results.insertId;
            callback(error, discente);
        });
    }

}