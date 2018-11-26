'use strict'

let jwt = require('jsonwebtoken');
let configuracao = require('../config/config');

exports.autenticarUsuario = async (req, res, next) => {
        if(req.body.email == null || req.body.email.length < 2 || req.body.password == null ||  req.body.password.length < 5){
            res.redirect('/login');
            return;
        }else if(req.body.email == "eduardo.dechechi@unioeste.br" && req.body.password == "topicos"){
            req.session.token = jwt.sign({ email: req.body.email }, configuracao.config.chave, { expiresIn: '12h'});
            res.redirect("/");
        }else if(req.body.email == "elizete@unioeste.br" && req.body.password == "topicos"){
            req.session.token = jwt.sign({ email: req.body.email }, configuracao.config.chave, { expiresIn: '12h'});
            res.redirect("/secretaria/aprovacoes");
        }else{
            res.redirect('/login');
            return;
        }
}