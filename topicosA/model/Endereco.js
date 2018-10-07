'use strict'

module.exports = class Endereco{
	
	constructor(){
		this._id_endereco = null;
        this._id_cidade = null;
        this._id_bairro = null;
        this._id_logradouro = null;
		this._cep = null;
    }
    
  set id_endereco(id_endereco) {
		this._id_endereco = id_endereco;
	}
	get id_endereco(){
		return this._id_endereco;
	}

	set id_cidade(id_cidade) {
		this._id_cidade = id_cidade;
	}
	get id_cidade(){
		return this._id_cidade;
	}
	set id_bairro (id_bairro){
		this._id_bairro = id_bairro;
	}
	get id_bairro(){
		return this._id_bairro;
	}
	set id_logradouro(id_logradouro) {
		this._id_logradouro = id_logradouro;
	}
	get id_logradouro(){
		return this._id_logradouro;
    }
    set cep(cep) {
		this._cep = cep;
	}
	get cep(){
		return this._cep;
    }
    

    

    construtorParametrosRequisicao(params){
        this._id_endereco = parseInt(params.id_endereco);
        this._id_cidade = parseInt(params.id_cidade) != null ? parseInt(params.id_cidade) : null;
        this._id_bairro = parseInt(params.id_bairro) != null ? parseInt(params.id_bairro) : null;
        this._id_logradouro = parseInt(params.id_logradouro) != null ? parseInt(params.id_logradouro) : null;
		this._cep = params.cep;
    }
}