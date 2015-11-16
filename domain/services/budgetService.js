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
    console.log("getBudgetByNameAndUserID");
    var deferred = q.defer();

    db_service.getInstance().then(
      function (db) {
        var cursor = db.collection('budgets').find(
          {
            "name": name,
            "user_id": user_id
          }
        );
        cursor.each(function(err, doc) {
          if (err) {
            db.close();
            deferred.reject(err);
          } else if (doc != null) {
            console.log("doc: ", doc);
            deferred.resolve(doc);
            db.close();
          } else {
            console.log("here");
          }
        });
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  budget_service.updateCurrentBudgetValueByID = function (budget_id, new_current_value) {
    var deferred = q.defer();

    db_service.getInstance().then(
      function (db) {
        db.collection('budgets').updateOne(
          {
            "_id": budget_id
          },
          {
            $set: { 'current_value': new_current_value }
          },
          function (err, results) {
            if (err) {
              deferred.reject(err);
              db.close();
            } else {
              deferred.resolve();
              db.close();
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
