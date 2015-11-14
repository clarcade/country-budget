var q = require('q');

var BUDGETS_SERVICE = (function (budgets_service, q) {
  budgets_service.getUserBudgets = function (user_id) {
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

  return budgets_service;
}(BUDGETS_SERVICE || {}, q));

module.exports = BUDGETS_SERVICE;
