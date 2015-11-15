var q = require('q');
var DB_SERVICE = require('./dbService.js');

var BUDGET_SERVICE = (function (budget_service,
                                q,
                                db_service) {
  budget_service.addBudget = function (budget) {
    var deferred = q.defer();

    db_service.getInstance().then(
      function (db) {
        db.collection('budgets').insertOne(
          budget,
          function(err, result) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(budget);
            }

            db.close();
          }
        );
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  budget_service.getBudgetByNameAndUserID = function (name, user_id) {
    var deferred = q.defer();
    var mongo_client = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';

    mongo_client.connect(url, function (err, db) {
      if (err) {
        deferred.reject(err);
      } else {
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
      }
    });

    return deferred.promise;
  };

  return budget_service;
}(BUDGET_SERVICE || {},
  q,
  DB_SERVICE));

module.exports = BUDGET_SERVICE;
