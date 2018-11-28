'use strict'

let jwt = require('jsonwebtoken');
let configuracao = require('../config/config');
let config = require('../config/config');
let discenteDao = require('../dao/discente-dao');
let crypto = require('../utils/crypto');

exports.autenticarUsuario = async (req, res, next) => {
        console.log(req.body);

        if(req.body.email == null || req.body.email.length < 2 || req.body.password == null ||  req.body.password.length < 5){
            res.redirect('/login?erro='+"Verifique suas informações");
            return;
        }else if(req.body.email == "eduardo.dechechi@unioeste.br" && req.body.password == "topicos" && req.body.tipo_usuario == config.tipo_usuario.coordenador){
            req.session.token = jwt.sign({ email: req.body.email, id_tipo_usuario: config.tipo_usuario.coordenador }, configuracao.config.chave, { expiresIn: '12h'});
            res.redirect("/");
        }else if(req.body.email == "elizete@unioeste.br" && req.body.password == "topicos" && req.body.tipo_usuario == config.tipo_usuario.secretaria){
            req.session.token = jwt.sign({ email: req.body.email, id_tipo_usuario: config.tipo_usuario.secretaria }, configuracao.config.chave, { expiresIn: '12h'});
            res.redirect("/secretaria/aprovacoes");
        }else if(req.body.tipo_usuario == config.tipo_usuario.discente){
            let dDao = new discenteDao(req.connection);
            dDao.recuperarDiscentePorEmail(req.body.email, (err, discente)=>{
                if(err) return res.redirect('/login');
                else{
                    let c = new crypto();
                    let isOK = false;
                    try{
                        isOK = c.compare(req.body.password, discente.senha);
                    }catch(e){
                        isOK = false;
                    }
                    if(isOK == false){

                        if(discente != null && req.body.password == discente.senha){
                            req.session.token = jwt.sign({ email: req.body.email, id_tipo_usuario: config.tipo_usuario.discente, id_usuario: discente.id_discente }, configuracao.config.chave, { expiresIn: '12h'});
                            res.redirect('/discentes/visualizar?id='+discente.id_discente);
                        }else{
                            res.redirect('/login?erro='+"Verifique suas informações");
                        }
                    }else{
                        res.redirect('/discente');
                    }
                }
            });

        }else{
            res.redirect('/login?erro='+"Verifique suas informações");
            return;
        }
}