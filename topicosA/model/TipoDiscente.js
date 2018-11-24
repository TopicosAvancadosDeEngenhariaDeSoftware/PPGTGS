'use strict'

module.exports = class TipoDiscente{
	
	constructor(){
		this._id_tipodiscente = null;
		this._nome = null;
	}

	set id_tipodiscente(id_tipodiscente) {
		this._id_tipodiscente = id_tipodiscente;
	}
	get id_tipodiscente(){
		return this._id_tipodiscente;
	}
	set nome (nome){
		this._nome = nome;
	}
	get nome(){
		return this._nome;
	}

    construtorParametrosRequisicao(params){
        this._id_tipodiscente = parseInt(params.id_tipodiscente);
		this._nome = params.nome;
    }
}