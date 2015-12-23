var express = require('express');
var validator = require('validator');
var ACCOUNT_SERVICE = require('../services/accountService.js');
var USER_SERVICE = require('../services/userService.js');

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
      if (!req.body) {
        console.log("Error: request missing body.");
        res.status(500).send("Couldn't create new account/user.");
      } else {
        var response_data = req.body;

        if (!response_data.firstName) {
          res.status(500).send('Missing first name.');
        } else if (!response_data.lastName) {
          res.status(500).send('Missing last name.');
        } else if (!response_data.email) {
          res.status(500).send('Missing email.');
        } else if (!response_data.password) {
          res.status(500).send('Missing password.');
        } else {
          try {
            var first_name = sanitizeName(response_data.firstName);
            var last_name = sanitizeName(response_data.lastName);
            var email = sanitizeEmail(response_data.email);
            var password = sanitizePassword(response_data.password);

            if (!validName(first_name)) {
              res.status(500).send('Invalid value for first name.');
            }
            if (!validName(last_name)) {
              res.status(500).send('Invalid value for last name.');
            }
            if (!validEmail(email)) {
              res.status(500).send('Invalid value for email.');
            }

            // TODO: Insert data into database
            ACCOUNT_SERVICE.createAccount().then(
              function (account_id) {
                return USER_SERVICE.createUser();
              },
              function () {
                throw "Failed to create account.";
              }
            ).then(
              function () {
                res.render('signin');
              },
              function () {
                throw "Failed to create user.";
              }
            )
          } catch (err) {
            console.log("Error: ", err);
            res.status(500).send('Failed to register new account/user');
          }
        }
      }
    });

  register_router.route('/business')
    .get(function (req, res) {
      res.render('business');
    });

  // Function Declarations
  function trimAndEscape(input) {
    var trimmedInput = validator.trim(input);
    var escapedInput = validator.escape(trimmedInput);

    return escapedInput;
  }

  function sanitizeName(name) {
    return trimAndEscape(name);
  }

  function sanitizeEmail(email) {
    var trimmedAndEscapedEmail = trimAndEscape(email);
    var normalizedEmail = validator.normalizeEmail(trimmedAndEscapedEmail);

    return normalizedEmail;
  }

  function sanitizePassword(password) {
    return trimAndEscape(password);
  }

  function validName(name) {
    var isValid = true
      , validNameExpression = /^[a-zA-Z0-9-_]+$/;

    if (!validNameExpression.test(name)) {
      isValid = false;
    }

    return isValid;
  }

  function validEmail(email) {
    var isValid = true;

    if (!validator.isEmail(email)) {
      isValid = false;
    }

    return isValid;
  }

  return register_router;
})();

module.exports = REGISTER_ROUTER;
