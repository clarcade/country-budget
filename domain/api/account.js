var EXPRESS = require('express');
var ACCOUNT_SERVICE = require('../services/accountService.js');
var HELPERS = require('../helpers/helpers.js');

var ACCOUNT_ROUTER = (function(express,
                               account_service,
                               helpers) {
  var account_router = express.Router({mergeParams: true});

  // MIDDLEWARE
  account_router.use(function (req, res, next) {
    console.log("ACCOUNT ROUTER.");
    next();
  });

  account_router.route('/')
    .get(function (req, res) { // ENDPOINT NEEDS TO BE SECURE
      account_service.getAllAccounts().then(
        function (accounts) {
          res.json(accounts);
        },
        function (err) {
          console.log("Error: ", err);
          res.status(500).send("Error getting accounts");
        }
      );
    })
    .post(function (req, res) { // ENDPOINT DOES NOT NEED TO BE SECURE
      if (!req.body || !req.body.data) {
        res.status(400).json({
          "success": false,
          "error": {
            "message": "Missing user data."
          }
        });
      } else {
        var request_data = req.body.data;

        if (!request_data.email) {
          res.status(400).json({
            "success": false,
            "error": {
              "field": 'email',
              "message": 'Email missing'
            }
          });
        } else {
          var user_email = helpers.sanitizeEmail(request_data.email);

          if (!user_email) {
            res.status(400).json({
              "success": false,
              "error": {
                "field": 'email',
                "message": 'Invalid email provided'
              }
            });
          } else {
            account_service.createAccount(user_email).then(
              function () {
                res.json({
                  "success": true
                });
              },
              function (err) {
                res.json({
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
    });

  return account_router;
})(EXPRESS,
  ACCOUNT_SERVICE,
  HELPERS);

module.exports = ACCOUNT_ROUTER;
