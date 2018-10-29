module.exports = class Endereco{
	
	constructor(){
		this._id_titulo = null;
        this._nome = null;
    }
    
  set id_titulo(id_titulo) {
		this._id_titulo = id_titulo;
	}
	get id_titulo(){
		return this._id_titulo;
    }
    set nome(nome) {
		this._nome = nome;
	}
	get nome(){
		return this._nome;
    }
}