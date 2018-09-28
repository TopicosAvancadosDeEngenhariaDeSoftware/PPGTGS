var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/naoautorizado', function(req, res, next) {
  res.render('naoautorizado', {});
});

module.exports = router;
