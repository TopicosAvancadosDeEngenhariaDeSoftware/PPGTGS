const moment = require('moment');
var mysql = require('mysql');  
const Discente = require('../model/Discente');



module.exports = class DiscenteDao{
    constructor(connection){
        this._connection = connection;
    }
    inserirDiscente(discente, callback){

        var sql = "INSERT INTO Discente (nome, data_nascimento, rg, cpf, username, senha, link_lattes, "+
        "email, id_endereco, numero_residencia, complemento, id_docente, isAceito, situacao, id_titulo, id_sexo, telefone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
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
        params.push(discente.id_titulo);
        params.push(discente.id_sexo);
        params.push(discente.telefone);

        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Tentou inserir:',results);
            if(error == null) discente.id = results.insertId;
            callback(error, discente);
        });
    }

    editarDiscente(discente, callback){
        var sql = "UPDATE Discente SET nome = ?, data_nascimento = ?, rg = ?, cpf = ?, username = ?, "+
        "senha = ?, link_lattes = ?, email = ?, id_endereco = ?, numero_residencia = ?, complemento = ?, "+
        "id_docente = ?, isAceito = ?, situacao = ?, id_titulo = ?, id_sexo = ?, telefone = ? WHERE id_discente = ?;"
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
        params.push(discente.id_titulo);
        params.push(discente.id_sexo);
        params.push(discente.telefone);
        params.push(discente.id_discente);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, discente);
        });
}

excluirDiscente(id_discente, callback){
    var sql = "DELETE FROM Discente WHERE id = ? ;"
    var params = [];
    params.push(id_discente);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);

    });
}


}