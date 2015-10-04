app.controller('GroupController', [
   '$scope',
   'CommonService',
   'GroupService',
   '$q',
   function(scope,
            common_service,
            group_service,
            $q) {
      common_service.setPageTitle('Group Page');
      scope.view = {};

      var get_income_data_promise = group_service.getActualIncomeData();
      var get_expense_data_promise = group_service.getActualExpenseData();

      get_income_data_promise.then(
         function () {
            var actual_income_data = group_service.group_actual_income_data;
            var temp_actual_income = 0;
            var count = actual_income_data.length;
            for (var i = 0; i < count; i++) {
               temp_actual_income += Number(actual_income_data[i].amount);
            }

            scope.view.group_actual_income = temp_actual_income;
         }
      );

      get_expense_data_promise.then(
         function () {
            var actual_expense_data = group_service.group_actual_expense_data;
            var temp_actual_expense = 0;
            var count = actual_expense_data.length;
            for (var i = 0; i < count; i++) {
               temp_actual_expense += Number(actual_expense_data[i].amount);
            }

            scope.view.group_actual_expense = temp_actual_expense;
         }
      );

      $q.all([get_income_data_promise, get_expense_data_promise]).then(
         function () {
            scope.view.group_actual_revenue = scope.view.group_actual_income -
               scope.view.group_actual_expense;

            scope.view.data_loaded = true;
         }
      );
   }
]);
