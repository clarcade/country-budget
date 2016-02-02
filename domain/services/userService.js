var Q = require('q');
var VALIDATOR = require('validator');
var HELPERS = require('../helpers/helpers.js');
var DB_SERVICE = require('./dbService.js');
var BCRYPT = require('bcrypt');

var USER_SERVICE = (function (user_service,
                              q,
                              validator,
                              helpers,
                              db_service,
                              bcrypt) {
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

  user_service.createUser = function (user_data) {
    console.log("createUser");
    var main_deferred = q.defer();
    var data_to_save = {};

    if (!user_data) {
      main_deferred.reject("User data must be provided");
    } else if (!user_data.email) {
      main_deferred.reject("Email must be provided");
    } else if (!user_data.password) {
      main_deferred.reject("Password must be provided");
    } else if (!user_data.contact_info) {
      main_deferred.reject("Contact Info must be provided");
    } else if (!user_data.contact_info.first_name) {
      main_deferred.reject("First name must be provided");
    } else if (!user_data.contact_info.last_name) {
      main_deferred.reject("Last name must be provided");
    } else {
      data_to_save.email = helpers.sanitizeEmail(user_data.email);

      var salt = bcrypt.genSaltSync(10);
      data_to_save.password = bcrypt.hashSync(user_data.password, salt);

      data_to_save.contact_info = {};
      data_to_save.contact_info.first_name = validator.trim(user_data.contact_info.first_name);
      data_to_save.contact_info.last_name = validator.trim(user_data.contact_info.last_name);

      if (!data_to_save.email) {
        main_deferred.reject('Error: invalid email provided');
      } else if (!data_to_save.password) {
        main_deferred.reject('Error: invalid password provided');
      } else if (!data_to_save.contact_info.first_name) {
        main_deferred.reject('Error: invalid first name provided');
      } else if (!data_to_save.contact_info.last_name) {
        main_deferred.reject('Error: invalid last name provided');
      } else {
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
                  users_collection
                    .findOne(
                      {"email": data_to_save.email},
                      function (err, user_doc) {
                        if (err) {
                          main_deferred.reject(err);
                        } else {
                          main_deferred.resolve(user_doc.email);
                        }
                      }
                    );
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
        deferred.reject("Server error");
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
  BCRYPT);

module.exports = USER_SERVICE;
