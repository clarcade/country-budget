app.factory('GroupService', [
   'Restangular',
   'AuthenticationService',
   '$location',
   function (restangular,
             authentication_service,
             location) {
      var group_service = {};
      var get_actual_income_data_promise = null;
      var get_actual_expense_data_promise = null;

      group_service.getActualIncomeData = function () {
         if (get_actual_income_data_promise === null) {
            get_actual_income_data_promise = restangular
               .one('group', authentication_service.auth.group.id)
               .one('income')
               .one('actual')
               .get();

            get_actual_income_data_promise.then(
               function (response) {
                  if (angular.isDefined(response.group_actual_income_data) &&
                     (response.group_actual_income_data !== null)) {
                     group_service.group_actual_income_data = response.group_actual_income_data;
                  }
               },
               function (error) {
                  console.log("Error retrieving group income data.");
               }
            );
         }

         return get_actual_income_data_promise;
      };

      group_service.addActualIncomeItem = function (item) {
         restangular
            .one('group', authentication_service.auth.group.id)
            .one('income')
            .all('actual')
            .post(item)
            .then(
            function (response) {
               if (angular.isDefined(response.item) &&
                  response.item !== null) {
                  console.log("Success adding new income item.");

                  group_service.group_actual_income_data.push(response.item);
                  location.path("/group/income/actual");
               }
            },
            function (error) {
               console.log("Error occurred while adding new income item.");
            }
         );
      };

      group_service.getActualExpenseData = function () {
         if (get_actual_expense_data_promise === null) {
            get_actual_expense_data_promise = restangular
               .one('group', authentication_service.auth.group.id)
               .one('expense')
               .one('actual')
               .get();

            get_actual_expense_data_promise.then(
               function (response) {
                  if (angular.isDefined(response.group_actual_expense_data) &&
                     (response.group_actual_expense_data !== null)) {
                     group_service.group_actual_expense_data = response.group_actual_expense_data;
                  }
               },
               function (error) {
                  console.log("Error retrieving group expense data.");
               }
            );
         }

         return get_actual_expense_data_promise;
      };

      group_service.addActualExpenseItem = function (item) {
         restangular
            .one('group', authentication_service.auth.group.id)
            .one('expense')
            .all('actual')
            .post(item)
            .then(
               function (response) {
                  if (angular.isDefined(response.item) &&
                     response.item !== null) {
                     console.log("Success adding new expense item.");
   
                     group_service.group_actual_expense_data.push(response.item);
                     location.path("/group/expense/actual");
                  }
               },
               function (error) {
                  console.log("Error occurred while adding new expense item.");
               }
            );
      };

      return group_service;
   }
]);
