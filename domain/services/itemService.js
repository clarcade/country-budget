var q = require('q');
var DB_SERVICE = require('./dbService.js');
var BUDGETS_SERVICE = require('./budgetsService.js');

var ITEM_SERVICE = (function (item_service,
                              q,
                              budgets_service,
                              db_service) {
  var addItemToDB = function (item) {
    var deferred = q.defer();

    db_service.getInstance().then(
      function (db) {
        db.collection('items').insertOne(
          item,
          function (err, result) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(item);
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

  item_service.addItem = function (item) {
    var deferred = q.defer();

    if (item.budgets) {
      var budgets_promise = budgets_service.updateBudgets(item.budgets, item.user_id);
      budgets_promise.then(
        function () {
          return addItemToDB(item);
        },
        function (err) {
          deferred.reject(err);
        }
      ).then(
        function (item) {
          deferred.resolve(item);
        },
        function (err) {
          deferred.reject(err);
        }
      );
    } else {
      // otherwise, just save item to db
      addItemToDB(item).then(
        function (item) {
          deferred.resolve(item);
        },
        function (err) {
          deferred.reject(err);
        }
      );
    }

    return deferred.promise;
  };

  return item_service;
}(ITEM_SERVICE || {},
  q,
  BUDGETS_SERVICE,
  DB_SERVICE));

module.exports = ITEM_SERVICE;
