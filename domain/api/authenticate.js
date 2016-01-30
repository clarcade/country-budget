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
  // THIS GET FUNCTION IS A TEMPLATE TO BE USED IN OTHER ROUTES THAT REQUIRE A SECURE TOKEN CHECK
    //.get(function (req, res) { // ENDPOINT DOES NOT NEED TO BE SECURE
    //  if (!req.body || !req.body.data) {
    //    res.status(400).send("Error: request missing user data.");
    //  } else {
    //    var request_data = req.body.data;
    //
    //    if (!request_data.token) {
    //      res.status(400).send('Missing token');
    //    } else {
    //      var token = request_data.token;
    //
    //      try {
    //        var decoded = jwt.verify(token, req.app.get('superSecret'));
    //
    //        res.json({
    //          "success": true,
    //          "message": "Sweet, your token was all good!",
    //          "decoded": decoded.foo
    //        });
    //      } catch (err) {
    //        console.log("Error: ", err);
    //
    //        var message = "Token Bad";
    //
    //        if (err.name === 'JsonWebTokenError') {
    //          message = "Invalid Token";
    //        } else if (err.name === 'TokenExpiredError') {
    //          message = "Token Expired";
    //        }
    //
    //        res.json({
    //          "success": false,
    //          "message": message
    //        });
    //      }
    //    }
    //  }
    //});

    .post(function (req, res) { // ENDPOINT DOES NOT NEED TO BE SECURE
      if (!req.body || !req.body.data) {
        res.status(400).json({
          "success": false,
          "message": "Missing user data"
        });
      } else {
        var request_data = req.body.data;

        if (!request_data.email) {
          res.status(400).json({
            "success": false,
            "field": "email",
            "message": "Email missing"
          });
        } else if (!request_data.password) {
          res.status(400).json({
            "success": false,
            "field": "password",
            "message": "Password missing"
          });
        } else {
          var data = {};
          data.email = helpers.sanitizeEmail(request_data.email);
          data.password = validator.trim(request_data.password);

          if (!data.email) {
            res.status(400).json({
              "success": false,
              "field": 'email',
              "message": "Invalid email"
            });
          } else if (!data.password) {
            res.status(400).json({
              "success": false,
              "field": 'password',
              "message": "Password incorrect"
            });
          } else {
            user_service.getUserByEmail(data.email).then(
              function (user_data) {
                var result = bcrypt.compareSync(data.password, user_data.password);

                if (user_data && result) {
                  var payload = {};
                  payload.email = user_data.email;
                  payload.password = user_data.password;

                  var cert = req.app.get('superSecret')
                    , jwt_options = {
                      'expiresIn': '3m'
                    }
                    , token = jwt.sign(payload, cert, jwt_options)
                    , cookie_options = {
                      httpOnly: true,
                      //maxAge: "180000" // 3 minutes
                      maxAge: "86400000" // 24 hours
                    };

                  res.cookie('token', token, cookie_options);

                  res.json({
                    "success": true,
                    "message": "Enjoy the token!"
                  });
                } else {
                  res.json({
                    "success": false,
                    "message": "Username or password incorrect."
                  });
                }
              },
              function (err) {
                res.status(400).json({
                  "success": false,
                  "message": err
                });
              }
            );
          }
        }
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
