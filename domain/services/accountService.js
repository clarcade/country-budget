var Q = require('q');
var DB_SERVICE = require('./dbService.js');

var ACCOUNT_SERVICE = (function (account_service,
                                 q,
                                 db_service) {
  account_service.getAllAccounts = function () {
    console.log("getAllAccounts");
    var deferred = q.defer();

    db_service.getAccountCollection().then(
      function (account_collection) {
        var search_criteria = {}
          , fields_to_return = {_id : 0};
        account_collection.find(
          search_criteria,
          fields_to_return
        ).toArray(function (err, accounts_data) {
            //console.log("accounts_data: ", accounts_data);
            deferred.resolve(accounts_data);
          });
      },
      function (err) {
        console.error("Error: ", err);
        deferred.reject("Server error");
      }
    );

    return deferred.promise;
  };

  account_service.createAccount = function (user_email) {
    console.log("createAccount");
    var deferred = q.defer();

    if (user_email) {
      db_service.getAccountCollection().then(
        function (account_collection) {
          var account_data = {};
          account_data.users = [];
          account_data.users.push(user_email);

          account_collection.insertOne(
            account_data,
            function (err, result) {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve();
              }
            }
          );
        },
        function (err) {
          console.error(err);
          deferred.reject("Server error");
        }
      );
    } else {
      deferred.reject('User email not provided');
    }

    return deferred.promise;
  };

  // TODO
  account_service.addUserEmailToAccount = function () {
    var deferred = q.defer();

    return deferred.promise;
  };

  return account_service;
})(ACCOUNT_SERVICE || {},
  Q,
  DB_SERVICE);

module.exports = ACCOUNT_SERVICE;
