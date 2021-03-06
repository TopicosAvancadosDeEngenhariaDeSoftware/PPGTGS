'use strict'

module.exports = class Discente{
	
	constructor(){
		this._id_discente = null;
		this._nome = null;
		this._sobrenome = null;
		this._data_nascimento = null;
		this._rg = null;
		this._cpf = null;
		this._username = null;
		this._senha = null;
		this._link_lattes = null;
		this._email = null;
		this._id_endereco = null;
		this._numero_residencia = null;
		this._complemento = null;
		this._id_docente = null;
		this._is_aceito = null;
		this._situacao = null;
        this._id_titulo = null;
        this._sexo = null;
		this._telefone = null;
		this._id_nacionalidade = null;
		this._passaporte = null;
		//this._cargo_instituicao =[];
        // this._id_tipo_discente = null;
        
		//acho q é assim q faz enum mas se nao for, ignora. 
		//se for dai so colocar desse jeito entao, so q n lembro os valores q deveriam ser alem.
		//const this._situacao ={
		//	ATIVO:1,
		//	INATIVO: 2,
		//	EGRESSO:3
		//}; 
	}

	set id_discente(id_discente) {
		this._id_discente = id_discente;
	}
	get id_discente(){
		return this._id_discente;
	}
	set nome (nome){
		this._nome = nome;
	}
	get nome(){
		return this._nome;
	}
	set sobrenome (sobrenome){
		this._sobrenome = sobrenome;
	}
	get sobrenome(){
		return this._sobrenome;
	}
	set data_nascimento(data_nascimento) {
		this._data_nascimento = data_nascimento;
	}
	get data_nascimento(){
		return this._data_nascimento;
	}
	set rg (rg){
		this._rg = rg;
	}
	get rg(){
		return this._rg;
	}
	set cpf (cpf){
		this._cpf = cpf;
	}
	get cpf(){
		return this._cpf;
	}
	set username(username) {
		this._username = username;
	}
	get username(){
		return this._username;
	}
	set senha (senha){
		this._senha = senha;
	}
	get senha(){
		return this._senha;
	}
	set tipo_usuario(tipo_usuario) {
		this._tipo_usuario = tipo_usuario;
	}
	get tipo_usuario(){
		return this._tipo_usuario;
	}
	set link_lattes (link_lattes){
		this._link_lattes = link_lattes;
	}
	get link_lattes(){
		return this._link_lattes;
	}
	set email(email) {
		this._email = email;
	}
	get email(){
		return this._email;
	}
	set id_endereco(id_endereco) {
		this._id_endereco = id_endereco;
	}
	get id_endereco(){
		return this._id_endereco;
	}
	set numero_residencia(numero_residencia) {
		this._numero_residencia = numero_residencia;
	}
	get numero_residencia(){
		return this._numero_residencia;
	}
	set complemento(complemento) {
		this._complemento = complemento;
	}
	get complemento(){
		return this._complemento;
	}
	set id_docente(id_docente) {
		this._id_docente = id_docente;
	}
	get id_docente(){
		return this._id_docente;
	}
	set is_aceito(is_aceito) {
		this._is_aceito = is_aceito;
	}
	get is_aceito(){
		return this._is_aceito;
	}
	set situacao(situacao) {
		this._situacao = situacao;
	}
	get situacao(){
		return this._situacao;
	}
	set id_titulo(id_titulo) {
		this._id_titulo = id_titulo;
	}
	get id_titulo(){
		return this._id_titulo;
    }
    set sexo(sexo) {
		this._sexo = sexo;
	}
	get sexo(){
		return this._sexo;
	}
	get cargo_instituicao(){
		return this._cargo_instituicao;	
	}
	get tipo_discente(){
		return this._tipo_discente;
    }
    set telefone(telefone) {
		this._telefone = telefone;
	}
	get telefone(){
		return this._telefone;
	}
	set id_nacionalidade(id_nacionalidade) {
		this._id_nacionalidade = id_nacionalidade;
	}
	get id_nacionalidade(){
		return this._id_nacionalidade;
	}
	set passaporte(passaporte) {
		this._passaporte = passaporte;
	}
	get passaporte(){
		return this._passaporte;
	}
	// set id_tipo_discente(id_tipo_discente) {
	// 	this._id_tipo_discente = id_tipo_discente;
	// }
	// get id_tipo_discente(){
	// 	return this._id_tipo_discente;
	// }
    
    construtorParametrosRequisicao(params){
        this._id_discente = parseInt(params.id_discente);
		this._nome = params.nome;
		this._sobrenome = params.sobrenome;
		this._data_nascimento = params.data_nascimento;
		this._rg = params.rg != null ? params.rg : null;
		this._cpf = params.cpf != null ? params.cpf : null;;
		this._username = params.username;
		this._senha = params.senha;
		this._link_lattes = params.link_perfil_lattes != null ? params.link_perfil_lattes : null;
		this._email = params.email;
		this._id_endereco = parseInt(params.id_endereco);
		this._numero_residencia = parseInt(params.endereco_num_residencia) != null ? parseInt(params.endereco_num_residencia) : null;
		this._complemento = params.endereco_complemento != null ? params.endereco_complemento : null;
		this._id_docente = parseInt(params.id_orientador);

		if (params.id_orientador == undefined || params.id_orientador == null){
			this._id_docente = parseInt(params.id_docente);
		}

		this._is_aceito = null;
		this._situacao = parseInt(params.situacao);
        this._id_titulo = parseInt(params.id_titulo);
        this._sexo = parseInt(params.id_sexo);
		this._telefone = params.telefone;
		this._id_nacionalidade = parseInt(params.id_nacionalidade);
		this._passaporte = params.passaporte != null ?  params.passaporte : null;
		// this._tipo_discente = parseInt(params.id_tipo_discente);

        /*calendars.forEach(function(params) {   
            this._cargo_instituicao.push(params.cargo_instituicao);
        });

		this._tipo_discente = [];*/
    }
}