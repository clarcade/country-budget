app.directive("validateBudgetName", function () {
  return {
    restrict: 'A',
    scope: {
      budgets: '=validateBudgetName'
    },
    require: 'ngModel',
    link: function (scope, element, attr, ctrl) {
      function validateName(ngModelValue) {
        var valid = true;

        if (scope.budgets && typeof scope.budgets.length === 'number') {
          var budgets = scope.budgets;
          var length = budgets.length;

          if (length > 0) {
            for (var i = 0; i < length; i++) {
              var current_budget = budgets[i];
              if (current_budget.name === ngModelValue) {
                console.log("Aaaah, bad name!");
                valid = false;
                i = length;
              } else {
                console.log("Cool cool");
              }
            }
          }
        }

        ctrl.$setValidity('same_name', valid);

        return ngModelValue;
      }

      ctrl.$parsers.push(validateName);
    }
  };
});
