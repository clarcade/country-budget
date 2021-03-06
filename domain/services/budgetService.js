var q = require('q');
var DB_SERVICE = require('./dbService.js');

var BUDGET_SERVICE = (function (budget_service,
                                q,
                                db_service) {
  budget_service.addBudget = function (budget) {
    var deferred = q.defer();

    db_service.getBudgetsCollection().then(
      function (budgets_collection) {
        budgets_collection.insertOne(
          budget,
          function(err, result) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(budget);
            }
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

    db_service.getBudgetsCollection().then(
      function (budgets_collection) {
        var cursor = budgets_collection.find(
          {
            "name": name,
            "user_id": user_id
          }
        );
        cursor.each(function(err, doc) {
          if (err) {
            deferred.reject(err);
          } else if (doc != null) {
            deferred.resolve(doc);
          }/* else {
            console.log("here");
          }*/
        });
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  budget_service.updateCurrentBudgetValueByID = function (budget_id, new_value) {
    var deferred = q.defer();

    db_service.getBudgetsCollection().then(
      function (budgets_collection) {
        budgets_collection.updateOne(
          {
            "_id": budget_id
          },
          {
            $set: { 'value': new_value }
          },
          function (err, results) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve();
            }
          }
        );
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  return budget_service;
}(BUDGET_SERVICE || {},
  q,
  DB_SERVICE));

module.exports = BUDGET_SERVICE;
