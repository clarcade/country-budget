var express = require('express');
var validator = require('validator');

var LIHP_ROUTER = (function() {
  var lihp_router = express.Router({mergeParams: true});

  lihp_router.use(function (req, res, next) {
    console.log('LIHP ROUTER.');
    next();
  });

  lihp_router.route('/')
    .get(function (req, res) {
      res.render('lihp');
    });

  return lihp_router;
})();

module.exports = LIHP_ROUTER;
