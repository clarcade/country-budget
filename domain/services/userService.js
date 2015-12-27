var Q = require('q');
var DB_SERVICE = require('./dbService.js');

var USER_SERVICE = (function (user_service,
                              q,
                              db_service) {
  user_service.checkEmailAvailable = function (email) {
    console.log("checkEmailAvailable");
    console.log("email: ", email);
    var deferred = q.defer();

    db_service.getUsersCollection().then(
      function (users_collection) {
        var cursor = users_collection.find({
          "email": email
        });

        cursor.count(function (err, count) {
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
    var deferred = q.defer();

    db_service.getUsersCollection().then(
      function (users_collection) {
        users_collection.insertOne(
          user_data,
          function (err, result) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(user_data); // TODO: Minimize data provided back
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
  DB_SERVICE);

module.exports = USER_SERVICE;
