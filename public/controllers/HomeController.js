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

    var updateBudgets = function (new_budgets, revenue_type) {
      var new_budgets_length = new_budgets.length;
      var budgets = $scope.view.user_budgets;
      var length = budgets.length;

      for (var i = 0; i < new_budgets_length; i++) {
        for (var j = 0; j < length; j++) {
          if (new_budgets[i].name === budgets[j].name) {
            console.log("old budget value: ", budgets[j].value);
            if (revenue_type === "Expense") {
              budgets[j].value -= new_budgets[i].value;
            } else {
              budgets[j].value += new_budgets[i].value;
            }
            console.log("new budget value: ", budgets[j].value);

            i = new_budgets_length;
            j = length;
          }
        }
      }
    };

    $scope.view = {};

    budget_service.getAllBudgets(user_id).then(
      function (response) {
        if (response && response.length > 0) {
          var budgets = response.plain();
          //console.log("budgets: ", budgets);
          $scope.view.user_budgets = budgets;
        }
      },
      function (error) {
        console.error(error);
      }
    );

    item_service.getAllItems(user_id).then(
      function (response) {
        var items = response.plain();
        //console.log("items: ", items);
        $scope.view.user_items = items;
      },
      function (response) {
        console.error("response: ", response);
      }
    );

    $scope.addItem = function () {
      //console.log("HomeController: addItem");

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
            console.error("response: ", response);
          }
        }
      ).then(
        function (response) {
          if (response && response.value) {
            var item = response.plain();
            console.log("Successfully added item.");
            console.log("item: ", item);
            $scope.view.user_items.push(item);
            if (item.budgets && item.budgets.length > 0) {
              updateBudgets(item.budgets, item.revenue_type);
            }
          }
        },
        function (error) {
          console.error("Error: ", error.data);
        }
      );
    };

    $scope.addBudget = function () {
      //console.log("HomeController: addBudget");

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
            console.error("response: ", response);
          }
        }
      ).then(
        function (response) {
          if (response && response.name) {
            var budget = response.plain();

            if (!$scope.view.user_budgets) {
              $scope.view.user_budgets = [];
            }

            $scope.view.user_budgets.push(budget);
          }
        },
        function (error) {
          console.error("Error: ", error);
        }
      );
    };

    $scope.editRemoveItem = function () {
      console.log("HomeController: editRemoveItem");
      //user_service.editRemoveItem();
    };
  }
]);
