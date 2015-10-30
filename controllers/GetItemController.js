app.controller('GetItemController', [
  '$scope',
  '$modalInstance',
  function ($scope,
            modal_instance) {
    $scope.view = {};
    $scope.view.item = {};
    $scope.view.revenue_types = [
      'Income',
      'Expense'
    ];
    $scope.view.item.revenue_type = $scope.view.revenue_types[0];
    $scope.view.item_types = [
      'Actual',
      'What-If'
    ];
    $scope.view.item.item_type = $scope.view.item_types[0];
    $scope.view.income_template_types = [
      'Normal',
      'CD',
      'Other'
    ];
    $scope.view.item.template_type = $scope.view.income_template_types[0];
    $scope.view.expense_template_types = [
      'Normal',
      'Mortgage Loan',
      'Auto Loan',
      'Other non-simple purchase'
    ];
    $scope.view.item.template_type = $scope.view.expense_template_types[0];
    $scope.view.recurrence_types = [
      'None',
      'Bi-Weekly',
      'Monthly',
      'Yearly'
    ];
    $scope.view.item.recurrence_type = $scope.view.recurrence_types[0];
    $scope.view.item.value = 0.00;
    $scope.view.item.date = new Date();
    $scope.status = {};
    $scope.status.opened = false;
    $scope.view.date_options = {
      //formatYear: 'yy',
      startingDay: 1
    };
    $scope.maxDate = new Date(2020, 5, 22);
    $scope.minDate = new Date();

    $scope.open = function () {
      console.log("GetItemController: open");
      $scope.status.opened = true;
    };

    $scope.done = function () {
      console.log("GetItemController: done");
      modal_instance.close($scope.view.item);
    };

    $scope.cancel = function () {
      console.log("GetItemController: cancel");
      modal_instance.dismiss('modal dismissed');
    };
  }
]);
