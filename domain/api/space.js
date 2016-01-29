var EXPRESS = require('express');
var VALIDATOR = require('validator');
var HELPERS = require('../helpers/helpers.js');

var SPACE_ROUTER = (function(express,
                             validator,
                             helpers) {
  var space_router = express.Router({mergeParams: true});

  // MIDDLEWARE
  space_router.use(function (req, res, next) {
    console.log("SPACE ROUTER.");
    next();
  });

  space_router.route('/')
    .get(function (req, res) {
    })
    .post(function (req, res) {
    });

  return space_router;
})(EXPRESS,
  VALIDATOR,
  HELPERS);

module.exports = SPACE_ROUTER;
