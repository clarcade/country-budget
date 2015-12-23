var express = require('express');
var validator = require('validator');
var USER_SERVICE = require('../services/userService.js');

var SIGNIN_ROUTER = (function() {
  var signin_router = express.Router({mergeParams: true});

  signin_router.route('/')
    .get(function (req, res) {
      res.render('signin');
    })
    .post(function (req, res) {
      if (!req.body) {
        console.log("Error: request missing body.");
        res.status(500).send("Couldn't sign in user.");
      } else {
        var response_data = req.body;

        if (!response_data.email) {
          res.status(500).send('Missing email.');
        } else if (!response_data.password) {
          res.status(500).send('Missing password.');
        } else {
          try {
            var email = sanitizeEmail(response_data.email);
            var password = sanitizePassword(response_data.password);

            if (!validEmail(email)) {
              res.status(500).send('Invalid value for email.');
            }

            USER_SERVICE.login(email, password).then(
              function () {
                res.send('');
              },
              function () {
                res.status(500).send('');
              }
            );
          } catch (err) {
            console.log("Error: ", err);
            res.status(500).send('Failed to register new account/user');
          }
        }
      }
    });

  // Function Declarations
  function trimAndEscape(input) {
    var trimmedInput = validator.trim(input);
    var escapedInput = validator.escape(trimmedInput);

    return escapedInput;
  }

  function sanitizeEmail(email) {
    var trimmedAndEscapedEmail = trimAndEscape(email);
    var normalizedEmail = validator.normalizeEmail(trimmedAndEscapedEmail);

    return normalizedEmail;
  }

  function sanitizePassword(password) {
    return trimAndEscape(password);
  }

  function validEmail(email) {
    var isValid = true;

    if (!validator.isEmail(email)) {
      isValid = false;
    }

    return isValid;
  }

  return signin_router;
})();

module.exports = SIGNIN_ROUTER;
