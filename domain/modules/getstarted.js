var express = require('express');

var REGISTER_ROUTER = (function() {
  var register_router = express.Router({mergeParams: true});

  register_router.route('/')
    .get(function (req, res) {
      res.render('getstarted');
    });

  register_router.route('/personal')
    .get(function (req, res) {
      res.render('personal');
    })
    .post(function (req, res) {
    });

  register_router.route('/business')
    .get(function (req, res) {
      res.render('business');
    });

  return register_router;
})();

module.exports = REGISTER_ROUTER;
