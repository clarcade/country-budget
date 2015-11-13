app.controller('HomeController', [
  '$scope',
  'UserService',
  'ItemService',
  'BudgetService',
  '$modal',
  function ($scope,
            user_service,
            item_service,
            budget_service,
            $modal) {
    var user_id = user_service.user.id;

    $scope.view = {};

    item_service.getAllItems(user_id).then(
      function (items) {
        console.log("items: ", items.plain());
        $scope.view.user_items = items.plain();
        //var length = $scope.view.user_items.length;
        //var sum = 0;
        //for (var i = 0; i < length; i++) {
        //  sum += $scope.view.user_items[i].value;
        //}
        //console.log("sum: ", sum);
        //
        //$scope.view.item_value_total = sum;
      },
      function (response) {
        console.log("response: ", response);
        console.log("something bad happened 1.");
      }
    );

    $scope.addItem = function () {
      console.log("HomeController: addItem");

      var get_item_modal = $modal.open({
        templateUrl: 'static/views/getitem.html',
        controller: 'GetItemController',
        size: 'lg'
      });

      get_item_modal.result.then(
        function (item) {
          return item_service.addItem(user_id, item);
        },
        function (response) {
          if (response) {
            console.log("response: ", response);
          }
        }
      ).then(
        function (item) {
          if (item && item.value) {
            console.log("Successfully added item.");
            console.log("item: ", item);
            $scope.view.user_items.push(item);
            $scope.view.item_value_total += item.value;
          }
        },
        function (error) {
          if (error && error.data) {
            console.error("Error: ", error.data);
          } else {
            console.error("Error: unknown");
          }
        }
      );
    };

    $scope.addBudget = function () {
      console.log("HomeController: addBudget");

      var get_budget_modal = $modal.open({
        templateUrl: 'static/views/getbudget.html',
        controller: 'GetBudgetController',
        size: 'lg'
      });

      get_budget_modal.result.then(
        function (budget) {
          return budget_service.addBudget(user_id, budget);
        },
        function (response) {
          if (response) {
            console.log("response: ", response);
          }
        }
      ).then(
        function (budget) {
          if (budget && budget.name) {
            console.log("Successfully added budget.");
            console.log("budget: ", budget);
          }
        },
        function (error) {
          if (error && error.data) {
            console.error("Error: ", error.data);
          } else {
            console.error("Error: unknown");
          }
        }
      );
    };

    $scope.editRemoveItem = function () {
      console.log("HomeController: editRemoveItem");
      //user_service.editRemoveItem();
    };
  }
]);
