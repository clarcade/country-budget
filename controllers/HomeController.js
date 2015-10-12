app.controller('HomeController', [
   '$scope',
   'UserService',
   function($scope,
            user_service) {
      $scope.view = {};

      $scope.addItem = function () {
         console.log("Adding Item");
         user_service.addItem();
      };

      $scope.editRemoveItem = function () {
         console.log("Edit/Remove Item");
         user_service.editRemoveItem();
      };

      //$scope.view = {};
      //$scope.view.user = user_service.user;
      //$scope.view.user.income_items = [];
      //$scope.view.user.expense_items = [];
      //
      //$scope.addItem = function () {
      //   var modal = $modal.open({
      //      templateUrl: 'views/addincome.html',
      //      controller: 'AddIncomeController',
      //      size: 'lg'
      //   });
      //   //user_service.addIncome().result.then(
      //   //   function (income_item) {
      //   //      console.log("income_item: ", income_item);
      //   //      $scope.view.user.income_items.push(income_item);
      //   //      console.log("user: ", $scope.view.user);
      //   //   },
      //   //   function (response) {
      //   //      console.log("Modal dismissed at: " + new Date());
      //   //      console.log("response: ", response);
      //   //   }
      //   //);
      //};
      //
      //$scope.addExpense = function () {
      //   user_service.addExpense().result.then(
      //      function (expense_item) {
      //         console.log("expense_item: ", expense_item);
      //         $scope.view.user.expense_items.push(expense_item);
      //         console.log("user: ", $scope.view.user);
      //      },
      //      function (response) {
      //         console.log("Modal dismissed at: " + new Date());
      //         console.log("response: ", response);
      //      }
      //   );
      //};
      //
      //$scope.updateCalculator = function() {
      //   console.log("Update Calculator stuff");
      //   console.log("view.user: ", $scope.view.user);
      //};
   }
]);
