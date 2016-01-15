var EXPRESS = require('express');
var VALIDATOR = require('validator');
var USER_SERVICE = require('../services/userService.js');
var HTTP = require('http');

var SIGNIN_ROUTER = (function(express,
                              validator,
                              user_service,
                              http) {
  var signin_router = express.Router({mergeParams: true});

  signin_router.use(function (req, res, next) {
    console.log("SIGNIN ROUTER.");
    console.log("method: ", req.method);
    if (req.method === 'POST') {
      if (!req.body || !req.body.token) {
        res.status(403).json({
          "success": false,
          "message": 'No token provided.'
        });
      } else {
        var token = req.body.token;
        //TODO
      }
    }
    next();
  });

  signin_router.route('/')
    .get(function (req, res) {
      res.render('signin');
    })
    .post(function (req, res) {
      if (!req.body || !req.body.data) {
        console.error("Error: request missing body.");
        res.status(400).send("Missing input data.");
      } else {
        var response_data = req.body.data;

        if (!response_data.email) {
          res.status(400).send('Missing email.');
        } else if (!response_data.password) {
          res.status(400).send('Missing password.');
        } else {
          try {
            var trimmed_email = validator.trim(response_data.email);
            var trimmed_and_escaped_email = validator.escape(trimmed_email);
            var sanitized_email = validator.normalizeEmail(trimmed_and_escaped_email);
            var password = validator.trim(response_data.password);

            if (!sanitized_email) {
              res.status(400).send('Invalid email value');
            } else if (!password) {
              res.status(400).send('Invalid password value');
            } else {
              res.send('testing');
              //user_service.login(email, password).then(
              //  function () {
              //    res.send('');
              //  },
              //  function () {
              //    res.status(500).send('');
              //  }
              //);
            }
          } catch (err) {
            console.log("Error: ", err);
            res.status(500).send('Failed to register new account/user');
          }
        }
      }
    });

  return signin_router;
})(EXPRESS,
  VALIDATOR,
  USER_SERVICE,
  HTTP);

module.exports = SIGNIN_ROUTER;
