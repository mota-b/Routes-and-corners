var express = require('express');
var router = express.Router();

/* traceroute */
router.get('/', function(req, res, next) {
  res.render('trace', {});
});

module.exports = router;
