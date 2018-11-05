'use strict'
const moment = require('moment');
var mysql = require('mysql');  
const Discente = require('../model/Discente');



module.exports = class DiscenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarDiscentes(callback){
        var sql = "SELECT * FROM Discente ;"
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

    recuperarDiscentePorId(id_discente, callback){
        var sql = "SELECT * FROM Discente WHERE id_discente = ? ;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    }

    recuperarDiscentePorNome(nome, callback){
        var sql = "SELECT * FROM Discente WHERE nome = ? ;"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    }

    recuperarDiscentePorEmail(email, callback){
        var sql = "SELECT * FROM Discente WHERE email = ? ;"
        var params = [];
        params.push(email);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    }

  /*  recuperarDiscentePorId(id_discente, callback){
        var sql = "SELECT * FROM Discente WHERE id_discente = ? ;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    }

    recuperarDiscentePorNome(nome, callback){
        var sql = "SELECT * FROM Discente WHERE nome = ? ;"
        var params = [];
        params.push(nome);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    } */

    inserirDiscente(discente, callback){

        var sql = "INSERT INTO Discente (nome,sobrenome, data_nascimento, rg, cpf, username, senha, link_lattes, "+
        "email, id_endereco, numero_residencia, complemento, id_docente, isAceito, situacao, id_titulo, sexo, telefone, id_nacionalidade, passaporte) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        var params = [];
        params.push(discente.nome);
        params.push(discente.sobrenome);
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
        params.push(discente.sexo);
        params.push(discente.telefone);
        params.push(discente.id_nacionalidade);
        params.push(discente.passaporte);

        sql = mysql.format(sql, params);
        console.log(sql);
        this._connection.query(sql, (error, results) =>{
            console.log('Tentou inserir:',results);
            if(error == null) discente.id_discente = results.insertId;
            callback(error, discente);
        });
    }

    editarDiscente(discente, callback){
        var sql = "UPDATE Discente SET nome = ?, data_nascimento = ?, rg = ?, cpf = ?, username = ?, "+
        "senha = ?, link_lattes = ?, email = ?, id_endereco = ?, numero_residencia = ?, complemento = ?, "+
        "id_docente = ?, isAceito = ?, situacao = ?, id_titulo = ?, sexo = ?, telefone = ? WHERE id_discente = ?;"
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
        params.push(discente.sexo);
        params.push(discente.telefone);
        params.push(discente.id_discente);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, discente);
        });
}

excluirDiscente(id_discente, callback){
    var sql = "DELETE FROM Discente WHERE id_discente = ? ;"
    var params = [];
    params.push(id_discente);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);

    });
}

//INDICADORES

buscarDiscenteInstituicao(id_instituicao, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteCargoInstituicao on Discente.id_discente = "+
        "DiscenteCargoInstituicao.id_discente inner join Instituicao on DiscenteCargoInstituicao.id_instituicao = Instituicao.id_instituicao WHERE "+
        "Instituicao.id_instituicao = ?;"
    }else{
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteCargoInstituicao on Discente.id_discente = "+
        "DiscenteCargoInstituicao.id_discente inner join Instituicao on DiscenteCargoInstituicao.id_instituicao = Instituicao.id_instituicao WHERE "+
        "Instituicao.id_instituicao = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_instituicao);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    //console.log(sql);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);
    });
}


buscarCargoDiscente(id_cargo_discente, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteCargoInstituicao on Discente.id_discente = "+
        "DiscenteCargoInstituicao.id_discente inner join CargoDiscente on DiscenteCargoInstituicao.id_cargo_discente = CargoDiscente.id_cargo_discente WHERE "+
        "CargoDiscente.id_cargo_discente = ?;"
    }else{
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteCargoInstituicao on Discente.id_discente = "+
    "DiscenteCargoInstituicao.id_discente inner join CargoDiscente on DiscenteCargoInstituicao.id_cargo_discente = CargoDiscente.id_cargo_discente WHERE "+
    "CargoDiscente.id_cargo_discente = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_cargo_discente);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);

    });
}

buscarPaisesDiscente(id_pais, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join Pais on Discente.id_nacionalidade = Pais.id_pais "+
        " WHERE Pais.id_pais = ?;"
    }else{
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join Pais on Discente.id_nacionalidade = Pais.id_pais "+
        " WHERE Pais.id_pais = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_pais);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);

    });
}

buscarTipoInstituicaoDiscente(id_tipo_instituicao, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteCargoInstituicao on Discente.id_discente = "+
        "DiscenteCargoInstituicao.id_discente inner join Instituicao on DiscenteCargoInstituicao.id_instituicao = Instituicao.id_instituicao WHERE "+
        "Instituicao.id_tipo_instituicao = ?;"
    }else{
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteCargoInstituicao on Discente.id_discente = "+
        "DiscenteCargoInstituicao.id_discente inner join Instituicao on DiscenteCargoInstituicao.id_instituicao = Instituicao.id_instituicao WHERE "+
        "Instituicao.id_tipo_instituicao = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_tipo_instituicao);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);
    });
}

buscarTituloDiscente(id_titulo, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente WHERE id_titulo = ?;"
    }else{
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente WHERE id_titulo = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_titulo);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);
    });
}


buscarTipoDiscente(id_tipo_discente, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteTipoDiscente on Discente.id_discente = "+
        "DiscenteTipoDiscente.id_discente inner join TipoDiscente on DiscenteTipoDiscente.id_tipo_discente = TipoDiscente.id_tipo_discente WHERE "+
        "TipoDiscente.id_tipo_discente = ?;"
    }else{
        var sql = "SELECT COUNT(Discente.id_discente) FROM Discente inner join DiscenteTipoDiscente on Discente.id_discente = "+
        "DiscenteTipoDiscente.id_discente inner join TipoDiscente on DiscenteTipoDiscente.id_tipo_discente = TipoDiscente.id_tipo_discente WHERE "+
        "TipoDiscente.id_tipo_discente = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_tipo_discente);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        callback(error, results);

    });
}

buscarIdDiscentePorTipoDiscente(id_tipo_discente, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT Discente.id_discente FROM Discente inner join DiscenteTipoDiscente on Discente.id_discente = "+
        "DiscenteTipoDiscente.id_discente inner join TipoDiscente on DiscenteTipoDiscente.id_tipo_discente = TipoDiscente.id_tipo_discente WHERE "+
        "TipoDiscente.id_tipo_discente = ?;"
    }else{
        var sql = "SELECT Discente.id_discente FROM Discente inner join DiscenteTipoDiscente on Discente.id_discente = "+
        "DiscenteTipoDiscente.id_discente inner join TipoDiscente on DiscenteTipoDiscente.id_tipo_discente = TipoDiscente.id_tipo_discente WHERE "+
        "TipoDiscente.id_tipo_discente = ? and Discente.situacao = ?;"
    }
    var params = [];
    params.push(id_tipo_discente);
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    console.log(sql);
    this._connection.query(sql, (error, results) =>{
        if(error){
            callback(error, null);
        }else{
            callback(error,results ? results : null);
        }
    });
}


recuperarDiscenteConformeTipoDiscente(id_discente, id_tipo_discente, callback){
    var sql = "SELECT Discente.id_discente, Discente.nome, Discente.sobrenome, Discente.email, Discente.id_docente, "+
    "Discente.id_titulo,  Discente.link_lattes, Discente.situacao, Discente.sexo, DiscenteTipoDiscente.data_inicial, DiscenteTipoDiscente.data_final, DiscenteTipoDiscente.isAtual, TipoDiscente.id_tipo_discente, TipoDiscente.nome as nome_tipo_discente FROM Discente inner join DiscenteTipoDiscente on Discente.id_discente = "+
    "DiscenteTipoDiscente.id_discente inner join TipoDiscente on DiscenteTipoDiscente.id_tipo_discente = TipoDiscente.id_tipo_discente WHERE "+
    "DiscenteTipoDiscente.id_discente = ? and DiscenteTipoDiscente.id_tipo_discente = ?;"
    var params = [];
    console.log('id discente: ', id_discente);
    console.log('id tipo discente: ', id_tipo_discente);
    params.push(id_discente);
    params.push(id_tipo_discente);
    sql = mysql.format(sql, params);
    console.log(sql);
    this._connection.query(sql, (error, results) =>{
        if(error){
            callback(error, null);
        }else{
            callback(error,results ? results : null);
        }

    });
}

buscarDiscentePorSituacao(id_situacao, callback){
    if(id_situacao == 0){
        var sql = "SELECT * from Discente;"
    }else{
        var sql = "SELECT * from Discente WHERE situacao = ?;"
    }
   
    var params = [];
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    console.log(sql);
    this._connection.query(sql, (error, results) =>{
        if(error){
            callback(error, null);
        }else{
            callback(error,results ? results : null);
        }
    });
}

buscarQuantidadeDiscentePorSituacao(id_situacao, callback){
    var sql = "SELECT COUNT(id_discente) from Discente WHERE situacao = ?;"
    var params = [];
    params.push(id_situacao);
    sql = mysql.format(sql, params);
    console.log(sql);
    this._connection.query(sql, (error, results) =>{
        if(error){
            callback(error, null);
        }else{
            callback(error,results ? results : null);
        }
    });
}


}