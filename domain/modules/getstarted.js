var EXPRESS = require('express');
var VALIDATOR = require('validator');
var ACCOUNT_SERVICE = require('../services/accountService.js');
var USER_SERVICE = require('../services/userService.js');

var REGISTER_ROUTER = (function(express,
                                validator,
                                account_service,
                                user_service) {
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
            // Sanitize User Input
            var first_name = trimAndEscape(response_data.firstName);
            var last_name = trimAndEscape(response_data.lastName);
            var trimmed_escaped_email = trimAndEscape(response_data.email);
            var normalized_email = validator.normalizeEmail(trimmed_escaped_email);
            var password = trimAndEscape(response_data.password);
            var valid_name_expression = /^[a-zA-Z0-9-]+$/;

            // Validate User Input
            if (!valid_name_expression.test(first_name)) {
              res.status(500).send('Invalid value for first name.');
            } else if (!valid_name_expression.test(last_name)) {
              res.status(500).send('Invalid value for last name.');
            } else if (!normalized_email) {
              res.status(500).send('Invalid value for email.');
            } else {
              var user_data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": normalized_email,
                "password": password
              };
              // TODO: Insert data into database
              // TODO: 1) Create new user
              // TODO: 2) Create new account
              //user_service.addUser(user_data).then(
              //  function (user_id) {
              //    // Create new account
              //    return account_service.addAccount(user_id);
              //  },
              //  function () {
              //    throw "Failed to create account.";
              //  }
              //).then(
              //  function () {
              //    res.render('signin');
              //  },
              //  function () {
              //    throw "Failed to create user.";
              //  }
              //);

              res.render('signin');
            }
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

  return register_router;
})(EXPRESS,
  VALIDATOR,
  ACCOUNT_SERVICE,
  USER_SERVICE);

module.exports = REGISTER_ROUTER;
