var q = require('q');
var DB_SERVICE = require('./dbService.js');

var BUDGETS_SERVICE = (function (budgets_service,
                                 q,
                                 db_service) {
  budgets_service.getUserBudgets = function (user_id) {
    var deferred = q.defer();

    db_service.getInstance().then(
      function (db) {
        var user_budgets = [];
        var cursor = db.collection('budgets').find( { "user_id": user_id } );
        cursor.each(function(err, doc) {
          if (err) {
            db.close();
            deferred.reject(err);
          } else if (doc != null) {
            user_budgets.push(doc);
          } else {
            db.close();
            deferred.resolve(user_budgets);
          }
        });
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  budgets_service.updateBudgets = function (budgets, user_id) {
    var deferred = q.defer();
    var length = budgets.length;
    var promises = [];

    var mongo_client = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';

    var db_connection = mongo_client.connect(url, function (err, db) {
      // Check if failed to connect to db
      if (err) {
        deferred.reject(err);
      } else {
        for (var i = 0; i < length; i++) {
          var new_deferred = q.defer();
          promises.push(new_deferred);

          // TODO 1: find budget by name & user_id
          // TODO 2: update budget by setting budget.current_value = budget.current_value - budgets[i].value

          //var cursor = db.collection('budgets').updateOne(
          //  {
          //    "name": budgets[i].name,
          //    "user_id": budgets[i].user_id
          //  },
          //  {
          //    $set: { 'current_value':  } // TODO
          //  },
          //  function (err, results) {
          //    if (err) {
          //      new_deferred.reject(err);
          //    } else {
          //      new_deferred.resolve();
          //    }
          //  }
          //);
        }
      }
    });
    console.log("db_connection: ", db_connection);

    q.all(promises).then(
      function () {
        deferred.resolve();
        db_connection.close();
      },
      function (err) {
        deferred.reject(err);
        db_connection.close();
      }
    );

    return deferred.promise;
  };

  return budgets_service;
}(BUDGETS_SERVICE || {},
  q,
  DB_SERVICE));

module.exports = BUDGETS_SERVICE;
