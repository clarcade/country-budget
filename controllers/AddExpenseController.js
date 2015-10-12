app.controller('AddExpenseController', [
   '$scope',
   'UserService',
   '$modalInstance',
   function($scope,
            user_service,
            modal_instance) {
      $scope.view = {};
      $scope.view.user = user_service.user;
      $scope.view.min_date = new Date();

      $scope.updateView = function () {
         var time_options = $scope.view.time_options;
         var count = time_options.length;
         for (var i = 0; i < count; i++) {
            if (time_options[i].value === $scope.view.time_selected_value) {
               $scope.view.time_label = time_options[i].label;
            }
         }
      };

      $scope.ok = function () {
         modal_instance.close({
            amount: $scope.view.amount,
            reoccurring: $scope.view.time_selected_value,
            start_date: $scope.view.start_date,
            end_date: $scope.view.end_date
         });
      };

      $scope.cancel = function () {
         modal_instance.dismiss('cancel clicked');
      };

      $scope.view.time_options = [
         {
            value: 'biweek',
            label: 'Bi-Weekly'
         },
         {
            value: 'month',
            label: 'Monthly'
         },
         {
            value: 'year',
            label: 'Yearly'
         }
      ];

      $scope.view.time_selected_value = $scope.view.time_options[0].value;
      $scope.view.time_label = $scope.view.time_options[0].label;

      $scope.getDayClass = function (date, mode) {
         console.log("date: ", date);
         console.log("mode: ", mode);
      };

      $scope.startTest = function () {
         console.log("view.start_date: ", $scope.view.start_date);
      };

      $scope.endTest = function () {
         console.log("view.end_date: ", $scope.view.end_date);
      };
   }
]);
