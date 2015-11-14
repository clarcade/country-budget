var q = require('q');

var BUDGET_SERVICE = (function (budget_service, q) {
  budget_service.addBudget = function (budget) {
    var deferred = q.defer();
    var mongo_client = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';

    mongo_client.connect(url, function (err, db) {
      if (err) {
        deferred.reject(err);
      } else {
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
      }
    });

    return deferred.promise;
  };

  return budget_service;
}(BUDGET_SERVICE || {}, q));

module.exports = BUDGET_SERVICE;
