var express = require('express');
var path = require('path');

var REGISTER_ROUTER = (function(path) {
  var register_router = express.Router({mergeParams: true});
  var base_url = __dirname + '/../../public/views/';

  register_router.route('/')
    .get(function (req, res) {
      res.sendFile(path.resolve(base_url + 'getstarted.html'));
    });

  register_router.route('/personal')
    .get(function (req, res) {
      res.sendFile(path.resolve(base_url + 'personal.html'));
    })
    .post(function (req, res) {

    });

  register_router.route('/business')
    .get(function (req, res) {
      res.sendFile(path.resolve(base_url + 'business.html'));
    })
    .post(function (req, res) {

    });

  return register_router;
})(path);

module.exports = REGISTER_ROUTER;
