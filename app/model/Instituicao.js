const config = require('../config/config');

module.exports = class Instituicao{
	
	constructor(){
		this._id_instituicao = null;
        this._nome = null;
        this._tipo_instituicao = null;
        this._sigla = null;
    }
    
    set id_instituicao(id_instituicao) {
		this._id_instituicao = id_instituicao;
	}
	get id_instituicao(){
		return this._id_instituicao;
    }
    set nome(nome) {
		this._nome = nome;
	}
	get nome(){
		return this._nome;
    }
    set tipo_instituicao(tipo_instituicao) {
		this._tipo_instituicao = tipo_instituicao;
	}
	get tipo_instituicao(){
		return this._tipo_instituicao;
    }
    set sigla(sigla) {
		this._sigla = sigla;
	}
	get sigla(){
		return this._sigla;
    }

    prepararInstituicaoBanco(dado_banco){
        
        this.id_instituicao = dado_banco.id_instituicao;
        this.nome = dado_banco.nome;
        this.sigla = dado_banco.sigla;
        if(dado_banco.id_tipo_instituicao == config.tipo_instituicao.publica.id){
            this.tipo_instituicao = config.tipo_instituicao.publica;
        }
        if(dado_banco.id_tipo_instituicao == config.tipo_instituicao.privada.id){
            this.tipo_instituicao = config.tipo_instituicao.privada;
        }
        //console.log(this);
    }
}