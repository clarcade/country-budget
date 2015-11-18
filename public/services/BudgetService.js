app.factory('BudgetService', [
  'Restangular',
  function (restangular) {
    var budget_service = {};

    budget_service.getAllBudgets = function (user_id) {
      if (!user_id) {
        console.error('user_id not provided');
      }
      return restangular
        .one('user', user_id)
        .getList('budgets');
    };

    budget_service.addBudget = function (user_id, budget) {
      if (!user_id) {
        console.error('user_id not provided');
      }
      if (!budget) {
        console.error('budget not provided');
      }

      return restangular
        .one('user', user_id)
        .all('budget')
        .post(budget);
    };

    return budget_service;
  }
]);
