var Q = require('q');
var VALIDATOR = require('validator');
var HELPERS = require('../helpers/helpers.js');
var DB_SERVICE = require('./dbService.js');
var JWT = require('jwt-simple');

var USER_SERVICE = (function (user_service,
                              q,
                              validator,
                              helpers,
                              db_service,
                              jwt) {
  user_service.checkEmailAvailable = function (email) {
    console.log("checkEmailAvailable");
    var deferred = q.defer();

    var sanitized_email = helpers.sanitizeEmail(email);

    db_service.getUsersCollection().then(
      function (users_collection) {
        users_collection
          .find({
            "email": sanitized_email
          })
          .count(function (err, count) {
            if (err) {
              deferred.reject("Database error occurred.");
            } else {
              if (count === 0) {
                deferred.resolve(true);
              } else {
                deferred.resolve(false);
              }
            }
          });
      },
      function (err) {
        console.error("Error: ", err);
        deferred.reject("Server error.");
      }
    );

    return deferred.promise;
  };

  user_service.addUser = function (user_data) {
    console.log("addUser");
    var main_deferred = q.defer();
    var data_to_save = {};

    if (!user_data.email) {
      main_deferred.reject("Email must be provided");
    } else if (!user_data.password) {
      main_deferred.reject("Password must be provided");
    } else {
      data_to_save.email = helpers.sanitizeEmail(user_data.email);
      data_to_save.password = user_data.password;

      user_service.checkEmailAvailable(data_to_save.email).then(
        function (email_available) {
          var deferred = null;
          var promise = null;

          if (email_available) {
            promise = db_service.getUsersCollection();
          } else {
            deferred = q.defer();
            promise = deferred.promise;
            deferred.reject("Email not available");
          }

          return promise;
        },
        function (err) {
          main_deferred.reject(err);
        }
      ).then(
        function (users_collection) {
          users_collection.insertOne(
            data_to_save,
            function (err, result) {
              if (err) {
                main_deferred.reject(err);
              } else {
                main_deferred.resolve();
              }
            }
          );
        },
        function (err) {
          console.error("Error: ", err);
          main_deferred.reject(err);
        }
      );
    }

    return main_deferred.promise;
  };

  user_service.getAllUsers = function (user_data) {
    console.log("getAllUsers");
    var deferred = q.defer();

    db_service.getUsersCollection().then(
      function (users_collection) {
        var search_criteria = {}
          , fields_to_return = {_id : 0};
        users_collection.find(
          search_criteria,
          fields_to_return
        ).toArray(function (err, users_data) {
          deferred.resolve(users_data);
        });
      },
      function (err) {
        console.error("Error: ", err);
        deferred.reject("Server error.");
      }
    );

    return deferred.promise;
  };

  // Currently assumes email is sanitized
  user_service.getUserByEmail = function (email) {
    console.log("getUserByEmail");
    var deferred = q.defer();

    db_service.getUsersCollection().then(
      function (users_collection) {
        var search_criteria = {'email': email}
          , fields_to_return = {_id : 0};
        users_collection.findOne(
          search_criteria,
          fields_to_return,
          function (err, user_data) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(user_data);
            }
          }
        );
      },
      function (err) {
        console.error("Error: ", err);
        deferred.reject("Server error.");
      }
    );

    return deferred.promise;
  };

  return user_service;
})(USER_SERVICE || {},
  Q,
  VALIDATOR,
  HELPERS,
  DB_SERVICE,
  JWT);

module.exports = USER_SERVICE;
