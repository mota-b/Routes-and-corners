var express = require('express');
var router = express.Router();

var trace_route = require("../Features/traceroute");

/*  */
router.get('/', function(req, res, next) {
  res.render('trace', {});
});


/* traceroute */
router.post('/traceroute', trace_route);




module.exports = router;
