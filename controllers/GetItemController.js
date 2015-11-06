app.controller('GetItemController', [
  '$scope',
  '$modalInstance',
  function ($scope,
            modal_instance) {
    $scope.view = {};
    $scope.view.item = {};
    $scope.view.try_submit = false;
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
    $scope.view.recurrence_end_types = [
      'No End Date',
      'With End Date'
    ];
    $scope.view.item.recurrence_end_type = $scope.view.recurrence_end_types[0];
    $scope.view.item.value = 0.00;
    var new_date = new Date();
    $scope.view.item.start_date = new_date;
    $scope.view.item.end_date = new Date(
      new_date.getFullYear(),
      new_date.getMonth(),
      new_date.getDate()
    );
    $scope.start_status = {};
    $scope.start_status.opened = false;
    $scope.end_status = {};
    $scope.end_status.opened = false;
    $scope.view.date_options = {
      //formatYear: 'yy',
      startingDay: 1
    };
    $scope.maxDate = new Date(2020, 5, 22);
    $scope.minDate = new Date();

    var valid_dates = [];
    valid_dates.push($scope.view.item.start_date);

    $scope.open = function (selectedStatus) {
      console.log("GetItemController: open");
      console.log("selectedStatus: ", selectedStatus);
      selectedStatus.opened = true;
    };

    $scope.done = function (form) {
      $scope.view.try_submit = true;
      console.log("GetItemController: done");
      console.log("valid: ", form.$valid);
      if (form.$valid) {
        if ($scope.view.item.recurrence_type && $scope.view.item.recurrence_type === 'None') {
          delete $scope.view.item.end_date;
        }
        modal_instance.close($scope.view.item);
      } else {
        console.log("Form not valid.");
      }
    };

    $scope.cancel = function () {
      console.log("GetItemController: cancel");
      modal_instance.dismiss('modal dismissed');
    };

    $scope.updateEndDatePicker = function () {
      valid_dates = [];

      var temp_date = new Date(
        $scope.view.item.start_date.getFullYear(),
        $scope.view.item.start_date.getMonth(),
        $scope.view.item.start_date.getDate()
      );
      valid_dates.push(temp_date);

      $scope.view.item.end_date = temp_date;
    };

    $scope.disableDates = function (date, mode) {
      var disable = true;

      if ($scope.view.item.recurrence_type === 'Bi-Weekly') {
        while (valid_dates[valid_dates.length - 1].getTime() < date.getTime()) {
          var temp_date = new Date(valid_dates[valid_dates.length - 1].toDateString());
          temp_date.setDate(temp_date.getDate() + 14);
          valid_dates.push(temp_date);
        }

        var length = valid_dates.length;
        for (var i = 0; i < length; i++) {
          if (valid_dates[i].getTime() === date.getTime()) {
            i = length;
            disable = false;
          }
        }
      }/* else if ($scope.view.item.recurrence_type === 'Monthly') {

      } else if ($scope.view.item.recurrence_type === 'Yearly') {

      }*/

      return disable;
    };
  }
]);
