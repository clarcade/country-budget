app.factory('GroupService', [
   'Restangular',
   'AuthenticationService',
   function(restangular,
            authentication_service) {
      var group_service = {};
      var get_income_data_promise = null;

      group_service.getActualIncomeData = function () {
         if (get_income_data_promise === null) {
            get_income_data_promise = restangular
               .one('group', authentication_service.auth.group.id)
               .one('income')
               .one('actual')
               .get();

            get_income_data_promise.then(
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

         return get_income_data_promise;
      };

      return group_service;
   }
]);
