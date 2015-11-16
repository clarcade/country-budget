var q = require('q');
var DB_SERVICE = require('./dbService.js');
var BUDGET_SERVICE = require('../services/budgetService.js');

var BUDGETS_SERVICE = (function (budgets_service,
                                 q,
                                 db_service,
                                 budget_service) {
  budgets_service.getUserBudgets = function (user_id) {
    var deferred = q.defer();

    db_service.getInstance().then(
      function (db) {
        var user_budgets = [];
        var cursor = db.collection('budgets').find( { "user_id": user_id } );
        cursor.each(function(err, doc) {
          if (err) {
            deferred.reject(err);
          } else if (doc != null) {
            user_budgets.push(doc);
          } else {
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

    // TODO: Figure out trickiness of changing i and new_deferred variables in budget_promise.then(), make more robust like db_service.dropAllCollections
    var length = budgets.length;
    var promises = [];
    var promise_map = {};
    for (var i = 0; i < length; i++) {
      var new_deferred = q.defer();
      promises.push(new_deferred.promise);
      promise_map[i] = new_deferred;

      var budget_promise = budget_service.getBudgetByNameAndUserID(budgets[i].name, user_id);
      budget_promise.then(
        function (current_budget) {
          var target_index = null;

          for (var i = 0; i < length; i++) {
            if (budgets[i].name === current_budget.name) {
              target_index = i;
              i = length;
            }
          }

          if (typeof target_index === 'number') {
            var new_current_value = current_budget.current_value - budgets[target_index].value;

            budget_service.updateCurrentBudgetValueByID(current_budget['_id'], new_current_value).then(
              function () {
                promise_map[target_index].resolve();
              },
              function (err) {
                promise_map[target_index].reject(err);
              }
            );
          } else {
            deferred.reject("Failed utterly");
          }
        },
        function (err) {
          deferred.reject(err);
        }
      );
    }

    q.all(promises).then(
      function () {
        deferred.resolve();
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  return budgets_service;
}(BUDGETS_SERVICE || {},
  q,
  DB_SERVICE,
  BUDGET_SERVICE));

module.exports = BUDGETS_SERVICE;
