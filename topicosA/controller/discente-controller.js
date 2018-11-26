'use strict'

const paisesDao = require('../dao/pais-dao');
const titulosDao = require('../dao/titulo-dao');
const docentesDao = require('../dao/docente-dao');
const instituicaoDao = require('../dao/instituicao-dao');
const discenteDao = require('../dao/discente-dao');
const tipoDiscenteDao = require('../dao/tipo-discente-dao');

const instituicaoModel = require('../model/Instituicao');

const config = require('../config/config');

exports.consultaTodosDiscente = async (req, res, next) => {
        var dDao = new discenteDao(req.connection);
        dDao.recuperarDiscentes((err, resultados) =>{
                if(err) next(err);
                res.render('discentes-consulta', {discentes : resultados});
        });
        
};

exports.consultaDiscenteFiltro = async (req, res, next) => {
        var idSituacao = 0;
        var idUsuario = 1;
        if(req.query.idSituacao != null) idSituacao = req.query.idSituacao;
        if(req.query.idUsuario != null) idUsuario = req.query.idUsuario;
        //console.log("idSituacao = "+ idSituacao);
        res.render('discentes-filtro', {idSituacao : idSituacao, idUsuario: idUsuario});
};

exports.cadastrarOk = async (req, res, next) => {
        res.render('discentes-registro-ok', {});
};

exports.cadastrarDiscente = async (req, res, next) => {
        var pDao = new paisesDao(req.connection);
        pDao.recuperarPaises((err, resultado_paises) =>{
                if(err) return next(err);
                var tDao = new titulosDao(req.connection);
                tDao.recuperarTitulos((err, resultados_titulos) => {
                        if(err) return next(err);
                        var dDao = new docentesDao(req.connection);
                        dDao.recuperarDocentesSomenteNome((err, resultados_docentes) =>{
                                if(err) return next(err);
                                
                                var iDao = new instituicaoDao(req.connection);
                                iDao.recuperarInstituicoes((err, resultados_instituicoes) =>{
                                        if(err) return next(err);

                                        var lista_instituicoes = [];
                                        for(var i = 0; i < resultados_instituicoes.length; i++){
                                                var instituicao = new instituicaoModel();
                                                instituicao.prepararInstituicaoBanco(resultados_instituicoes[i]);
                                                lista_instituicoes.push(instituicao);
                                        }

                                        var lista_tipo_instituicao = [];
                                        lista_tipo_instituicao.push(config.tipo_instituicao.publica);
                                        lista_tipo_instituicao.push(config.tipo_instituicao.privada);

                                        var tipoDiscenteD = new tipoDiscenteDao(req.connection);
                                        tipoDiscenteD.recuperarTiposDiscente((err, results_tipos_discentes) =>{
                                                if(err) return next(err);
                                                res.render('discentes-registro', {tipos_discente: results_tipos_discentes,  paises : resultado_paises, titulos : resultados_titulos, docentes: resultados_docentes, instituicoes : lista_instituicoes, tipos_instituicao : lista_tipo_instituicao});                                });
                                                
                                        });

                                        

                        });
                });      
        });   
}

exports.alterarDiscente = async (req, res, next) => {
        var pDao = new paisesDao(req.connection);
        pDao.recuperarPaises((err, resultado_paises) =>{
                if(err) return next(err);
                var tDao = new titulosDao(req.connection);
                tDao.recuperarTitulos((err, resultados_titulos) => {
                        if(err) return next(err);
                        var dDao = new docentesDao(req.connection);
                        dDao.recuperarDocentesSomenteNome((err, resultados_docentes) =>{
                                if(err) return next(err);
                                
                                var iDao = new instituicaoDao(req.connection);
                                iDao.recuperarInstituicoes((err, resultados_instituicoes) =>{
                                        if(err) return next(err);

                                        var lista_instituicoes = [];
                                        for(var i = 0; i < resultados_instituicoes.length; i++){
                                                var instituicao = new instituicaoModel();
                                                instituicao.prepararInstituicaoBanco(resultados_instituicoes[i]);
                                                lista_instituicoes.push(instituicao);
                                        }

                                        var lista_tipo_instituicao = [];
                                        lista_tipo_instituicao.push(config.tipo_instituicao.publica);
                                        lista_tipo_instituicao.push(config.tipo_instituicao.privada);

                                        res.render('discentes-alterar', {paises : resultado_paises, titulos : resultados_titulos, docentes: resultados_docentes, instituicoes : lista_instituicoes, tipos_instituicao : lista_tipo_instituicao});
                                });
                       
                        });
                });      
        });   
}