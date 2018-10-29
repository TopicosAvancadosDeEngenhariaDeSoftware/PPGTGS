'use strict'

let jwt = require('jsonwebtoken');
let configuracao = require('../config/config');

exports.autenticarUsuario = async (req, res, next) => {
        if(req.body.email == null || req.body.email.length < 2 || req.body.password == null ||  req.body.password.length < 5){
            res.redirect('/login');
            return;
        }
        if(req.body.email == "cleberdsmds@gmail.com" && req.body.password == "topicos"){
            req.session.token = jwt.sign({ email: req.body.email }, configuracao.config.chave, { expiresIn: '12h'});
            res.redirect("/");
        }else{
            res.redirect('/login');
            return;
        }
}