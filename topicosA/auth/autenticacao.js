'use strict'

let jwt = require('jsonwebtoken');
let configuracao = require('../config/config');

exports.verificacarAutenticacao = (req, res, next) => {

    let auth = req.session.token;
    if(auth == null || auth == undefined ){
        req.session = null;
        return res.redirect('/naoautorizado');
    }else    
    jwt.verify(auth, configuracao.config.chave, (err, data) => {
        if (err) {
            req.session = null;
            return res.redirect('/naoautorizado');
        }else{
            req.email = data.email;
            next();
        }    
    });

}