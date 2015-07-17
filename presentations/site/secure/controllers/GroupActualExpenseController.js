app.controller('GroupActualExpenseController', [
   '$scope',
   'CommonService',
   'GroupService',
   '$location',
   function(scope,
            common_service,
            group_service,
            location) {
      common_service.setPageTitle('Group Expense - Actual');
      scope.view = {};
      scope.view.year_collection = [];
      scope.view.month_collection = [];

      group_service.getActualExpenseData().then(
         function () {
            scope.view.group_actual_expense = group_service.group_actual_expense_data;

            var temp_actual = 0;
            var count = scope.view.group_actual_expense.length;
            for (var i = 0; i < count; i++) {
               temp_actual += Number(scope.view.group_actual_expense[i].amount);
            }

            scope.view.total_actual_group_expense = temp_actual;
         }
      );

      scope.addGroupActualExpense = function () {
         location.path("/group/expense/actual/newitem");
      };

      // Year Data -- Make into a directive later
      var date = new Date();
      var current_year = date.getFullYear();
      scope.view.selected_year = current_year;
      var temp_year = current_year - 5;
      for (var i = 0; i < 11; i++) {
         scope.view.year_collection.push(temp_year++);
      }

      // Month Data -- Make into a directive later
      scope.view.month_collection.push({id: 0, name: "January"});
      scope.view.month_collection.push({id: 1, name: "February"});
      scope.view.month_collection.push({id: 2, name: "March"});
      scope.view.month_collection.push({id: 3, name: "April"});
      scope.view.month_collection.push({id: 4, name: "May"});
      scope.view.month_collection.push({id: 5, name: "June"});
      scope.view.month_collection.push({id: 6, name: "July"});
      scope.view.month_collection.push({id: 7, name: "August"});
      scope.view.month_collection.push({id: 8, name: "September"});
      scope.view.month_collection.push({id: 9, name: "October"});
      scope.view.month_collection.push({id: 10, name: "November"});
      scope.view.month_collection.push({id: 11, name: "December"});
      scope.view.selected_month = date.getMonth();
   }
]);
