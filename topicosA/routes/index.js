var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var graficoDados = new Object();
  graficoDados.titulo = "Discentes";
  graficoDados.subtitulo = "";

  var categorias = [];
  categorias.push("Inciativa Privada");
  categorias.push("Educação Básica");
  categorias.push("FPTI");
  categorias.push("Itaipu");
  categorias.push("Educação Superior");
  graficoDados.categorias = categorias;

  var dados = [];
  dados.push(4);
  dados.push(8);
  dados.push(6);
  dados.push(15);
  dados.push(2);
  graficoDados.dados = dados;

  graficoDados.tituloY = "Numero de discentes";

  return res.render('base', {email : req.email, grafico :graficoDados });
});

module.exports = router;
