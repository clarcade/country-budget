var EXPRESS = require('express');
var ACCOUNT_SERVICE = require('../services/accountService.js');
var USER_SERVICE = require('../services/userService.js');
var Q = require('q');

var REGISTER_ROUTER = (function(express,
                                account_service,
                                user_service,
                                q) {
  var register_router = express.Router({mergeParams: true});

  register_router.route('/')
    .post(function (req, res) {
      if (!req.body || !req.body.data) {
        res.status(400).json({
          "success": false,
          "error": {
            "message": "Missing user data"
          }
        });
      } else {
        var request_data = req.body.data;

        var MAX_ATTEMPTS = 3
          , attempt_count = 0
          , createUserPromise = null;

        function provisionNewUser() {
          if (attempt_count < MAX_ATTEMPTS) {
            // CREATE USER
            if (!createUserPromise) {
              createUserPromise = user_service.createUser(request_data);
            }

            createUserPromise.then(
              function (user_email) {
                // CREATE ACCOUNT
                return account_service.createAccount(user_email);
              },
              function (err) {
                var deferred = q.defer();

                deferred.reject(err);

                return deferred.promise;
              }
            ).then(
              function () {
                // SUCCESS!
                res.json({
                  "success": true
                });
              },
              function (err) {
                // RETRY
                console.error(err);
                attempt_count++;
                provisionNewUser();
              }
            );
          } else {
            // FAILED
            res.status(500).json({
              "success": false,
              "error": {
                "message": "Failed to register new user account"
              }
            });
          }
        }

        provisionNewUser();
      }
    });

  return register_router;
})(EXPRESS,
  ACCOUNT_SERVICE,
  USER_SERVICE,
  Q);

module.exports = REGISTER_ROUTER;
