'use strict'
const moment = require('moment');
var mysql = require('mysql');  
const Discente = require('../model/Discente');
const crypto = require('../utils/crypto');



module.exports = class DiscenteDao{
    constructor(connection){
        this._connection = connection;
    }

    recuperarDiscentes(callback){
        var sql = "select * from discente ;"
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

    recuperarDiscentePorStatusCadastro(status_Cadastro, callback){
    if(status_Cadastro == 0){
        var sql = "select * from discente where isaceito is null or isaceito=0;"
    }else{
        var sql = "select * from discente where isaceito=1;"
    }
   
    var params = [];
    sql = mysql.format(sql, params);
    this._connection.query(sql, (error, results) =>{
        if(error){
            callback(error, null);
        }else{
            callback(error,results ? results : null);
        }
    });
}

    /*
    recuperarDiscentesPendentes(callback){
        var sql = "SELECT * FROM Discente WHERE isAceito IS NULL OR isAceito=0;"
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

    recuperarDiscentesAceitos(callback){
        var sql = "SELECT * FROM Discente WHERE isAceito=1;"
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
    */

    recuperarDiscentePorId(id_discente, callback){
        var sql = "select * from discente where id_discente = ? ;"
        var params = [];
        params.push(id_discente);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            //console.log('RESULTs ',results);
            if(error){
                callback(error, null);
            }else{
                callback(error,results[0] ? results[0] : null);
            }
            
        });
    }

    recuperarDiscentePorNome(nome, situacao, callback){
         
        nome = "%"+nome+"%";
        if(situacao == 0){
            var sql = "select * from discente where nome = ?;"
        }
        else{
            var sql = "select * from discente where nome like ? and situacao = ?;"
        }
        var params = [];
        params.push(nome);
        params.push(situacao);
        sql = mysql.format(sql, params);
        this._connection.query(sql, (error, results) =>{
            console.log('RESULTs ',results);

            if(error){
                callback(error, null);
            }else{
                callback(error,results ? results : null);
            }
            
        });
    }

    recuperarDiscentePorEmail(email, callback){
        var sql = "select * from discente where email = ? ;"
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

        let c = new crypto();
        var sql = "insert into discente (nome,sobrenome, data_nascimento, rg, cpf, username, senha, link_lattes, "+
        "email, id_endereco, numero_residencia, complemento, id_docente, isaceito, situacao, id_titulo, sexo, telefone, id_nacionalidade, passaporte) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        var params = [];
        params.push(discente.nome);
        params.push(discente.sobrenome);
        params.push(discente.data_nascimento);
        params.push(discente.rg);
        params.push(discente.cpf);
        params.push(discente.username);
        params.push(c.encrypt(discente.senha));
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
        var sql = "update discente set nome = ?, sobrenome = ?, data_nascimento = ?, rg = ?, cpf = ?, username = ?, "+
        "senha = ?, link_lattes = ?, email = ?, id_nacionalidade = ?, "+
        "id_docente = ?, isaceito = ?, id_titulo = ?, sexo = ?, telefone = ? where id_discente = ?;";
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
        params.push(discente.id_nacionalidade);
        // params.push(discente.id_endereco);
        // params.push(discente.numero_residencia);
        // params.push(discente.complemento);
        params.push(discente.id_docente);
        params.push(discente.isAceito);
        // params.push(discente.situacao);
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


aprovarDiscente(discente, callback){
        var sql = "update discente set isaceito = 1 where id_discente = ?;"

        var params = [];
        params.push(discente.id_discente);
       
        sql = mysql.format(sql, params);

        this._connection.query(sql, (error, results) =>{
            console.log('Resultado',results);
            callback(error, discente);
        });
}

excluirDiscenteLogico(id_discente, callback){ //exclusão lógica
    var sql = "update discente set situacao = 2 where id_discente = ? ;"
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

excluirDiscente(id_discente, callback){ //exclusão lógica
    var sql = "delete from discente where id_discente = ?;"
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

//INDICADORES

buscarDiscenteInstituicao(id_instituicao, id_situacao, callback){
    if(id_situacao == 0){
        var sql = "select count(discente.id_discente) from discente inner join discentecargoinstituicao on discente.id_discente = "+
        "discentecargoinstituicao.id_discente inner join instituicao on discentecargoinstituicao.id_instituicao = instituicao.id_instituicao where "+
        "instituicao.id_instituicao = ?;";
    }else{
        var sql = "select count(discente.id_discente) from discente inner join discentecargoinstituicao on discente.id_discente = "+
        "discentecargoinstituicao.id_discente inner join instituicao on discentecargoinstituicao.id_instituicao = instituicao.id_instituicao where "+
        "instituicao.id_instituicao = ? and discente.situacao = ?;";
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
        var sql = "select count(discente.id_discente) from discente inner join discentecargoinstituicao on discente.id_discente = "+
        "discentecargoinstituicao.id_discente inner join cargodiscente on discentecargoinstituicao.id_cargo_discente = cargodiscente.id_cargo_discente where "+
        "cargodiscente.id_cargo_discente = ?;";
    }else{
        var sql = "select count(discente.id_discente) from discente inner join discentecargoinstituicao on discente.id_discente = "+
        "discentecargoinstituicao.id_discente inner join cargodiscente on discentecargoinstituicao.id_cargo_discente = cargodiscente.id_cargo_discente where "+
        "cargodiscente.id_cargo_discente = ? and discente.situacao = ?;";
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
        var sql = "select count(discente.id_discente) from discente inner join pais on discente.id_nacionalidade = pais.id_pais "+
        " where pais.id_pais = ?;";
    }else{
        var sql = "select count(discente.id_discente) from discente inner join pais on discente.id_nacionalidade = pais.id_pais "+
        " where pais.id_pais = ? and discente.situacao = ?;"
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
        var sql = "select count(discente.id_discente) from discente inner join discentecargoinstituicao on discente.id_discente = "+
        "discentecargoinstituicao.id_discente inner join instituicao on discentecargoinstituicao.id_instituicao = instituicao.id_instituicao where "+
        "instituicao.id_tipo_instituicao = ?;";
    }else{
        var sql = "select count(discente.id_discente) from discente inner join discentecargoinstituicao on discente.id_discente = "+
        "discentecargoinstituicao.id_discente inner join instituicao on discentecargoinstituicao.id_instituicao = instituicao.id_instituicao where "+
        "instituicao.id_tipo_instituicao = ? and discente.situacao = ?;";
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
        var sql = "select count(discente.id_discente) from discente where id_titulo = ?;"
    }else{
        var sql = "select count(discente.id_discente) from discente where id_titulo = ? and discente.situacao = ?;"
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
        var sql = "select count(discente.id_discente) from discente inner join discentetipodiscente on discente.id_discente = "+
        "discentetipodiscente.id_discente inner join tipodiscente on discentetipodiscente.id_tipo_discente = tipodiscente.id_tipo_discente where "+
        "tipodiscente.id_tipo_discente = ?;";
    }else{
        var sql = "select count(discente.id_discente) from discente inner join discentetipodiscente on discente.id_discente = "+
        "discentetipodiscente.id_discente inner join tipodiscente on discentetipodiscente.id_tipo_discente = tipodiscente.id_tipo_discente where "+
        "tipodiscente.id_tipo_discente = ? and discente.situacao = ?;";
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
        var sql = "select discente.id_discente from discente inner join discentetipodiscente on discente.id_discente = "+
        "discentetipodiscente.id_discente inner join tipodiscente on discentetipodiscente.id_tipo_discente = tipodiscente.id_tipo_discente where "+
        "tipodiscente.id_tipo_discente = ?;";
    }else{
        var sql = "select discente.id_discente from discente inner join discentetipodiscente on discente.id_discente = "+
        "discentetipodiscente.id_discente inner join tipodiscente on discentetipodiscente.id_tipo_discente = tipodiscente.id_tipo_discente where "+
        "tipodiscente.id_tipo_discente = ? and discente.situacao = ?;";
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
    var sql = "select discente.id_discente, discente.nome, discente.sobrenome, discente.email, discente.id_docente, "+
    "discente.id_titulo,  discente.link_lattes, discente.situacao, discente.sexo, discentetipodiscente.data_inicial, discentetipodiscente.data_final, discentetipodiscente.isatual, tipodiscente.id_tipo_discente, tipodiscente.nome as nome_tipo_discente from discente inner join discentetipodiscente on discente.id_discente = "+
    "discentetipodiscente.id_discente inner join tipodiscente on discentetipodiscente.id_tipo_discente = tipodiscente.id_tipo_discente where "+
    "discentetipodiscente.id_discente = ? and discentetipodiscente.id_tipo_discente = ?;";
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
        var sql = "select * from discente;"
    }else{
        var sql = "select * from discente where situacao = ?;"
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
    var sql = "select count(id_discente) from discente where situacao = ?;"
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