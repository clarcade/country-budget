app.factory('BudgetService', [
  'Restangular',
  function (restangular) {
    var budget_service = {};

    budget_service.getAllBudgets = function (user_id) {
      return restangular
        .one('user', user_id)
        .getList('budgets');
    };

    budget_service.addBudget = function (user_id, budget) {
      console.log("BudgetService: addBudget");
      return restangular
        .one('user', user_id)
        .all('budget')
        .post(budget);
    };

    return budget_service;
  }
]);
