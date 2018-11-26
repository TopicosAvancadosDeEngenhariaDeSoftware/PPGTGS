'use strict'

let jwt = require('jsonwebtoken');
let configuracao = require('../config/config');

exports.verificarSessao = (req, res, next) => {

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
            req.id_tipo_usuario = data.id_tipo_usuario;
            req.id_usuario = data.id_usuario;
            next();
        }    
    });

}