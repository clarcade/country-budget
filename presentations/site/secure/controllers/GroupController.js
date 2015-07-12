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
      //scope.rowCollection = [];

      var get_income_data_promise = group_service.getActualIncomeData();

      $q.all([get_income_data_promise]).then(
         function () {
//            console.log(group_service.group_actual_income_data);

            var actual_income_data = group_service.group_actual_income_data;
            var temp_actual = null;
            var count = actual_income_data.length;
            for (var i = 0; i < count; i++) {
               temp_actual += Number(actual_income_data[i].amount);
            }

            scope.view.group_actual_income = temp_actual;

            //if (group_service.group_income_data !== null) {
            //
            //}
            //scope.rowCollection.push({
            //   label: "Income",
            //   actual: group_service.income_data.actual,
            //   what_if: group_service.income_data.what_if
            //});

            scope.view.data_loaded = true;
         }
      );
   }
]);
