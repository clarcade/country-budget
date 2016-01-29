var EXPRESS = require('express');
var VALIDATOR = require('validator');
var HELPERS = require('../helpers/helpers.js');
var USER_SERVICE = require('../services/userService.js');
var BCRYPT = require('bcrypt');

var USER_ROUTER = (function(express,
                            validator,
                            helpers,
                            user_service,
                            bcrypt) {
  var user_router = express.Router({mergeParams: true});

  // MIDDLEWARE
  user_router.use(function (req, res, next) {
    console.log("USER ROUTER.");
    next();
  });

  user_router.route('/')
    .get(function (req, res) { // ENDPOINT NEEDS TO BE SECURE
      user_service.getAllUsers().then(
        function (users) {
          res.json(users);
        },
        function (err) {
          console.log("Error: ", err);
          res.status(500).send("Error getting users data.");
        }
      );
    })
    .post(function (req, res) { // ENDPOINT DOES NOT NEED TO BE SECURE
      if (!req.body || !req.body.data) {
        res.status(400).send("Error: request missing user data.");
      } else {
        var request_data = req.body.data;

        if (typeof(request_data) === 'object') {
          if (!request_data.length || (request_data.length === 1)) { // Add single user
            if (request_data.length) {
              request_data = request_data[0];
            }
            if (!request_data.email) {
              res.status(400).send("Email missing.");
            } else if (!request_data.password) {
              res.status(400).send("Password missing.");
            } else if (!request_data.first_name) {
              res.status(400).send("First name missing.");
            } else if (!request_data.last_name) {
              res.status(400).send("Last name missing.");
            } else {
              var user_data = {};
              user_data.email = helpers.sanitizeEmail(request_data.email);
              user_data.contact_info = {};
              user_data.contact_info.first_name = validator.trim(request_data.first_name);
              user_data.contact_info.last_name = validator.trim(request_data.last_name);

              var salt = bcrypt.genSaltSync(10);
              user_data.password = bcrypt.hashSync(request_data.password, salt);

              if (!user_data.email) {
                res.status(400).send('Error: invalid email provided');
              } else if (!user_data.password) {
                res.status(400).send('Error: invalid password provided');
              } else if (!user_data.contact_info.first_name) {
                res.status(400).send('Error: invalid first name provided');
              } else if (!user_data.contact_info.last_name) {
                res.status(400).send('Error: invalid last name provided');
              } else {
                user_service.addUser(user_data).then(
                  function () {
                    res.json({
                      "success": true
                    });
                  },
                  function (err) {
                    res.json({
                      "success": false,
                      "message": err
                    });
                  }
                );
              }
            }
          } else if (request_data && request_data.length > 2) { // Add multiple user
            // MIGHT NOT WANT TO TODO ACTUALLY

            res.send('TODO: Add multiple users');
          } else {
            res.status(400).send("Error: Malformed user data");
          }
        } else {
          res.status(400).send("Error: Malformed user data");
        }
      }
    });

  //user_router.route('/email/:email')
  //  .get(function (req, res) {
  //    console.log("req stuff: ", req.params);
  //    if (!req.params.email) {
  //      res.status(400).send('Error: request missing email');
  //    } else {
  //      var sanitized_email = helpers.sanitizeEmail(request_data.email);
  //
  //      if (!sanitized_email) {
  //        res.status(400).send('Invalid email value');
  //      } else {
  //        user_service.getUserByEmail(sanitized_email).then(
  //          function (user_data) {
  //            res.json(user_data);
  //          },
  //          function () {
  //            res.status(500).send('Server error occurred');
  //          }
  //        );
  //      }
  //    }
  //  })
  //  .head(function (req, res) {  // ENDPOINT DOES NOT NEED TO BE SECURE
  //    if (!req.params.email) {
  //      res.status(400).send('Error: request missing email.');
  //    } else {
  //      var email = req.params.email;
  //      var trimmed_email = validator.trim(email);
  //      var trimmed_and_escaped_email = validator.escape(trimmed_email);
  //      var sanitized_email = validator.normalizeEmail(trimmed_and_escaped_email);
  //
  //      if (!sanitized_email) {
  //        res.status(400).send('');
  //      } else {
  //        user_service.checkEmailAvailable(sanitized_email).then(
  //          function (isAvailable) {
  //            if (isAvailable) {
  //              res.status(204).send('');
  //            } else {
  //              res.send('');
  //            }
  //          },
  //          function () {
  //            res.status(500).send('');
  //          }
  //        );
  //      }
  //    }
  //  });

  return user_router;
})(EXPRESS,
  VALIDATOR,
  HELPERS,
  USER_SERVICE,
  BCRYPT);

module.exports = USER_ROUTER;
