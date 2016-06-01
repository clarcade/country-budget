var EXPRESS = require('express');
var VALIDATOR = require('validator');
var HELPERS = require('../helpers/helpers.js');
var USER_SERVICE = require('../services/userService.js');
var JWT = require('jsonwebtoken');
var BCRYPT = require('bcrypt');

var AUTHENTICATE_ROUTER = (function(express,
                                    validator,
                                    helpers,
                                    user_service,
                                    jwt,
                                    bcrypt) {
  var authenticate_router = express.Router({mergeParams: true});

  // MIDDLEWARE
  authenticate_router.use(function (req, res, next) {
    console.log("AUTHENTICATE ROUTER.");
    next();
  });

  authenticate_router.route('/')
    .post(function (req, res) { // ENDPOINT DOES NOT NEED TO BE SECURE
      if (!req.body || !req.body.data) {
        res.status(400).json({
          "success": false,
          "error": {
            "message": "Missing user data"
          }
        });
      } else {
        var request_data = req.body.data;

        if (!request_data.email) {
          res.status(400).json({
            "success": false,
            "error": {
              "field": "email",
              "message": "Email missing"
            }
          });
        } else if (!request_data.password) {
          res.status(400).json({
            "success": false,
            "error": {
              "field": "password",
              "message": "Password missing"
            }
          });
        } else {
          var data = {};
          data.email = helpers.sanitizeEmail(request_data.email);
          data.password = validator.trim(request_data.password);

          if (!data.email) {
            res.status(400).json({
              "success": false,
              "error": {
                "field": 'email',
                "message": "Email must be in the form **@**.com"
              }
            });
          } else if (!data.password) {
            res.status(400).json({
              "success": false,
              "error": {
                "field": 'password',
                "message": "Please enter password"
              }
            });
          } else {
            user_service.getUserByEmail(data.email).then(
              function (user_data) {
                if (user_data && user_data.password) {
                  var result = null;
                  try {
                    result = bcrypt.compareSync(data.password, user_data.password);
                  } catch (err) {
                    console.error(err);

                    res.status(500).json({
                      "success": false,
                      "error": {
                        "message": "Server error occurred."
                      }
                    });
                  }

                  if (result) {
                    var payload = {};
                    payload.email = user_data.email;
                    payload.password = user_data.password;

                    var cert = req.app.get('superSecret')
                      , jwt_options = {
                        //'expiresIn': '3m'
                        'expiresIn': '1d'
                      }
                      , token = jwt.sign(payload, cert, jwt_options)
                      , cookie_options = {
                        httpOnly: true,
                        //maxAge: "180000" // 3 minutes
                        maxAge: "86400000" // 24 hours
                        // secure: true // later
                      };

                    res.cookie('token', token, cookie_options);

                    res.json({
                      "success": true,
                      "message": "Enjoy the token!"
                    });
                  } else {
                    res.status(400).json({
                      "success": false,
                      "error": {
                        "message": "Failed to authenticate email/password"
                      }
                    });
                  }
                } else {
                  res.status(400).json({
                    "success": false,
                    "error": {
                      "message": "Failed to authenticate email/password"
                    }
                  });
                }
              },
              function (err) {
                res.status(400).json({
                  "success": false,
                  "error": {
                    "message": err
                  }
                });
              }
            );
          }
        }
      }
    })
    .delete(function (req, res) {
      try {
        res.clearCookie('token');
        res.status(200).json({
          "success": true,
          "message": "Successfully invalidated token"
        });
      } catch (err) {
        res.status(500).json({
          "success": false,
          "error": {
            "message": "Failed to invalidate token"
          }
        });
      }
    });

  return authenticate_router;
})(EXPRESS,
  VALIDATOR,
  HELPERS,
  USER_SERVICE,
  JWT,
  BCRYPT);

module.exports = AUTHENTICATE_ROUTER;
