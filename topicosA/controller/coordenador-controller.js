'use strict'

let jwt = require('jsonwebtoken');
let configuracao = require('../config/config');

exports.carregarTelaIndicadores= async (req, res, next) => {
        res.render('coordenador-indicadores', {});
}