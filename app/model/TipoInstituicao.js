module.exports = class TipoInstituicao{
	
	constructor(){
		this._id_tipo_instituicao = null;
        this._nome = null;
    }
    
    set id_tipo_instituicao(id_tipo_instituicao) {
		this._id_tipo_instituicao = id_tipo_instituicao;
	}
	get id_tipo_instituicao(){
		return this._id_tipo_instituicao;
    }
    set nome(nome) {
		this._nome = nome;
	}
	get nome(){
		return this._nome;
    }
}