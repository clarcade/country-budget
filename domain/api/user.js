var EXPRESS = require('express');
var VALIDATOR = require('validator');
var USER_SERVICE = require('../services/userService.js');

var USER_ROUTER = (function(express,
                           validator,
                           user_service) {
  var user_router = express.Router({mergeParams: true});

  // MIDDLEWARE
  user_router.use(function (req, res, next) {
    console.log("USER ROUTER.");
    next();
  });

  user_router.route('/')
    .get(function (req, res) { // ENDPOINT NEEDS TO BE SECURE
      // return list of all users
    })
    .post(function (req, res) { // ENDPOINT DOES NOT NEED TO BE SECURE
      if (!req.body) {
        res.status(400).send("Error: request missing user data.");
      } else {
        var request_data = req.body;

        // TODO: Check for adding single/multiple user/s

        // Add single user
        if (!request_data.email) {
          res.status(400).send("Email missing.");
        } else {
          user_service.addUser(request_data).then(
            function (user_data) {
              res.send(user_data);
            },
            function (err) {
              res.status(500).send('');
            }
          );
        }
        // Add multiple users
      }
    });

  user_router.route('/email/:email')
    .head(function (req, res) {  // ENDPOINT DOES NOT NEED TO BE SECURE
      if (!req.params.email) {
        res.status(400).send('Error: request missing email.');
      } else {
        var email = req.params.email;
        var trimmed_email = validator.trim(email);
        var trimmed_and_escaped_email = validator.escape(trimmed_email);
        var sanitized_email = validator.normalizeEmail(trimmed_and_escaped_email);

        if (!sanitized_email) {
          res.status(400).send('');
        } else {
          user_service.checkEmailAvailable(sanitized_email).then(
            function (isAvailable) {
              if (isAvailable) {
                res.status(204).send('');
              } else {
                res.send('');
              }
            },
            function () {
              res.status(500).send('');
            }
          );
        }
      }
    });

  return user_router;
})(EXPRESS,
  VALIDATOR,
  USER_SERVICE);

module.exports = USER_ROUTER;
