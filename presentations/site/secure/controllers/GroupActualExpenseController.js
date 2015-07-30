app.controller('GroupActualExpenseController', [
   '$scope',
   'CommonService',
   'GroupService',
   '$location',
   '$filter',
   function(scope,
            common_service,
            group_service,
            location,
            filter) {
      common_service.setPageTitle('Group Expense - Actual');
      scope.view = {};
      scope.view.year_collection = [];
      scope.view.month_collection = [];
      scope.view.items_per_page = 6;
      scope.view.displayed_pages = 3;

      function getFilteredTableData() {
         console.log("Called getFilteredTableData");

         var filtered_data = [];
         var data_item = null;
         var data_count = scope.view.group_actual_expense.length;

         for (var i = 0; i < data_count; i++) {
            data_item = [scope.view.group_actual_expense[i]];

            if (angular.isDefined(scope.view.selected_month) &&
                (scope.view.selected_month !== null) &&
                angular.isNumber(scope.view.selected_month) &&
                (scope.view.selected_month !== 12)) {
               data_item = filter('filter')(
                  data_item,
                  scope.view.month_collection[scope.view.selected_month].name.slice(0, 3)
               );
            }

            if (angular.isDefined(scope.view.selected_year) &&
                (scope.view.selected_year !== null) &&
                angular.isNumber(scope.view.selected_year)) {
               data_item = filter('filter')(
                  data_item,
                  scope.view.selected_year
               );
            }

            if (data_item.length > 0) {
               filtered_data.push(data_item[0]);
            }
         }

         return filtered_data;
      };

      scope.rowQuery = function (tableState) {
         console.log("Called rowQuery");
         if (angular.isUndefined(tableState)) {
            tableState = {};
            tableState.sort = {
               predicate: 'DATE',
               reverse: 'true'
            };
         }

         var filtered_data = getFilteredTableData();

         scope.view.row_collection = filter('orderBy')(
            filtered_data,
            tableState.sort.predicate,
            tableState.sort.reverse
         );

         console.log(scope.view.row_collection.length);

         updateActualExpenseTotal();

         // This calculates the number of pages
         tableState.pagination.numberOfPages =
            (scope.view.group_actual_expense.length /
             scope.view.items_per_page) +
            (scope.view.group_actual_expense.length %
             scope.view.displayed_pages);

         // Now we need to update the view to reflect the
         // correct number of results based on what's left
         // in the appropriate current page
      };

      function updateActualExpenseTotal () {
         var temp_actual = 0;
         var count = scope.view.row_collection.length;
         for (var i = 0; i < count; i++) {
            temp_actual += Number(scope.view.row_collection[i].amount);
         }

         scope.view.total_actual_group_expense = temp_actual;
      };

      group_service.getActualExpenseData().then(
         function () {
            scope.view.group_actual_expense = group_service.group_actual_expense_data;

            //var temp_actual = 0;
            //var count = scope.view.group_actual_expense.length;
            //for (var i = 0; i < count; i++) {
            //   temp_actual += Number(scope.view.group_actual_expense[i].amount);
            //}
            //
            //scope.view.total_actual_group_expense = temp_actual;
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
      scope.view.month_collection.push({id: 12, name: "All"});
      //scope.view.selected_month = date.getMonth();
      scope.view.selected_month = 12;
   }
]);
